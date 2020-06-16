import * as React from 'react';
import '../Map.css'
import { getWeight, findEdjeIndex, removeEdje, addPointBetweenOtherTwo } from '../MapUtils'
import { IMap, IShop, IProduct } from '../../../globals/interfaces';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreState } from '../../../redux/store';
import { selectShops, updateShop } from '../../../redux/shopsReducer';
import { Grid, makeStyles, createStyles, Button, Typography } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import CreateIcon from '@material-ui/icons/Create';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';

// import ShopMap from './shopMap.svg'
const EDITOR_MODES = {
    ADDING_POINTS: 'Add points',
    CONNECTING_POINTS: 'Connect points',
    MOVING_POINTS: 'Move points',
    DELETING: 'Delete points',
    SELECTING_ENTRY_POINT: 'Selecting entry point'
}

let startPoint: any = [];
let endPoint = [];
let selectedPoint: any = null;
const POINT_COLOR = 'black';
const ENTRY_POINT_COLOR = 'green';
const POINT_STROKE = 'white';
const PRODUCT_COLOR = 'red';
const LINE_COLOR = 'RoyalBlue';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%'
        },
        mapGrid: {
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center'
        },
        submit: {
            backgroundColor: 'gray',
            width: '30%'
        }
    }),
);

const MapEditor = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { id } = useParams();
    const shops = useSelector(selectShops);
    const [entryPoint, setEntryPoint] = React.useState('0,0');

    const shop = React.useMemo(() => {
        if (!shops || !shops.length) return null;

        return shops.find((el) => el.id === id) as IShop
    }, [shops]);

    const [adjList, setAdjList] = React.useState({} as IMap);

    React.useEffect(() => {
        if (!shop) return;

        setAdjList(JSON.parse(shop.map));
        setEntryPoint(shop.mapEntryPoint || '0,0')
    }, [shop])

    const shopProducts = useSelector((state: IStoreState) => state.productsState.products.filter((el) => el.shopId === id)) as IProduct[]
    const [products, setProducts] = React.useState(localStorage.products ? JSON.parse(localStorage.products) : []);

    React.useEffect(() => {
        if (!shopProducts || !shopProducts.length) return;

        setProducts(shopProducts.map((el) => el.coordinates));
    }, [shop])

    const [editorMode, setEditorMode] = React.useState(EDITOR_MODES.ADDING_POINTS)
    const [routeScale, setRouteScale] = React.useState(5);
    const originalElementCoords = React.useRef(null);
    const selectedElement = React.useRef(null);
    const svgRef = React.useRef(null);

    const addVertex = (point: string) => {
        if (adjList[point]) return;
        setAdjList((prevList: IMap): IMap => {
            return { ...prevList, [point]: [] }
        });
    }

    // const getVectorDistance = (x1, y1, x2, y2) => {
    //     return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2))
    // }

    const addEdge = (point1: string, point2: string) => {
        setAdjList((prevMap: IMap) => {
            return {
                ...prevMap,
                [point1]: [...prevMap[point1], { coord: point2, weight: getWeight(point1, point2) }],
                [point2]: [...prevMap[point2], { coord: point1, weight: getWeight(point1, point2) }]
            }
        })
    }

    const addPointIntoLine = (event: any) => {
        if (event.target.tagName === 'circle') return;
        const dim = svgRef.current.getBoundingClientRect();
        const x = event.clientX - dim.left;
        const y = event.clientY - dim.top;
        const newPoint = x + ',' + y;
        if (adjList[newPoint]) return;
        const point1 = event.currentTarget.getAttribute('x1') + ',' + event.currentTarget.getAttribute('y1');
        const point2 = event.currentTarget.getAttribute('x2') + ',' + event.currentTarget.getAttribute('y2');

        setAdjList((prevMap: IMap) => addPointBetweenOtherTwo(prevMap, point1, point2, newPoint))
    }

    const removeLine = (event: any) => {
        const point1 = event.currentTarget.getAttribute('x1') + ',' + event.currentTarget.getAttribute('y1')
        const point2 = event.currentTarget.getAttribute('x2') + ',' + event.currentTarget.getAttribute('y2');

        setAdjList((prevMap: IMap) => {
            removeEdje(prevMap, point1, point2);
            removeEdje(prevMap, point2, point1);
            return { ...prevMap }
        });
    }

    const lineAction = (event: any) => {
        switch (editorMode) {
            case EDITOR_MODES.ADDING_POINTS: addPointIntoLine(event); break;
            case EDITOR_MODES.DELETING: removeLine(event); break;
            default: return;
        }
    }

    const addLine = (event: any) => {
        const x = event.currentTarget.getAttribute('cx');
        const y = event.currentTarget.getAttribute('cy');
        if (!selectedPoint) selectedPoint = event.currentTarget;
        selectedPoint.classList.remove('connecting-points-color')
        selectedPoint.setAttribute('fill', 'blue');

        if (!startPoint.length) {
            startPoint = [x, y];
            return;
        }

        if (startPoint[0] === x && startPoint[1] === y) {
            selectedPoint.classList.add('connecting-points-color')
            selectedPoint.setAttribute('fill', POINT_COLOR);
            selectedPoint = false;
            startPoint = [];
            endPoint = [];

            event.stopPropagation();
            return;
        }

        if (!endPoint.length) {
            endPoint = [x, y];

            if (findEdjeIndex(adjList[startPoint.toString()], endPoint.toString()) === -1) {
                addEdge(startPoint.toString(), endPoint.toString());
            };

            selectedPoint.classList.add('connecting-points-color')
            selectedPoint.setAttribute('fill', POINT_COLOR);
            selectedPoint = false;
            startPoint = [];
            endPoint = []
            event.stopPropagation()
        }
    }

    const removePoint = (event: any) => {
        const x = event.currentTarget.getAttribute('cx');
        const y = event.currentTarget.getAttribute('cy');

        setAdjList((prevMap: IMap) => {
            const edjes = prevMap[x + ',' + y];
            edjes.forEach(element => {
                removeEdje(prevMap, element.coord, x + ',' + y);
            });
            const { [x + ',' + y]: deleted, ...objectWithoutDeletedProp } = prevMap;
            return objectWithoutDeletedProp;
        });
    }

    const changeEntryPoint = (event: any) => {
        const x = event.currentTarget.getAttribute('cx');
        const y = event.currentTarget.getAttribute('cy');

        setEntryPoint(x + ',' + y);
    }

    const pointAction = (event: any) => {
        switch (editorMode) {
            case EDITOR_MODES.CONNECTING_POINTS: addLine(event); break;
            case EDITOR_MODES.DELETING: removePoint(event); break;
            case EDITOR_MODES.SELECTING_ENTRY_POINT: changeEntryPoint(event); break;
            default: return;
        }
    }

    const addRoutePoint = (event: any) => {
        if (event.target.tagName === 'circle' || event.target.tagName === 'line') return;
        const dim = svgRef.current.getBoundingClientRect();
        const x = event.clientX - dim.left;
        const y = event.clientY - dim.top;

        addVertex(x.toString() + ',' + y.toString());
    }

    const addPoint = (event: any) => {
        switch (editorMode) {
            case EDITOR_MODES.ADDING_POINTS: addRoutePoint(event); break;
            default: break;
        }
    }

    const dragPoint = (event: any) => {
        if (editorMode !== EDITOR_MODES.MOVING_POINTS || !originalElementCoords.current) return;
        event.preventDefault();
        const dim = svgRef.current.getBoundingClientRect();
        const newX = event.clientX - dim.left;
        const newY = event.clientY - dim.top;
        const currentPointCoords = originalElementCoords.current;
        if (adjList[newX + ',' + newY]) return;
        setAdjList((prevMap: IMap) => {
            const currentPointNeighbours = prevMap[currentPointCoords];
            if (!currentPointNeighbours) return;
            currentPointNeighbours.forEach((neighbour) => {
                const list = prevMap[neighbour.coord];
                if (!list) return;
                const currentPointIndex = findEdjeIndex(list, currentPointCoords);
                if (currentPointIndex === -1) return;
                list[currentPointIndex] = { coord: newX + ',' + newY, weight: getWeight(neighbour.coord, newX + ',' + newY) };
            })
            const { [currentPointCoords]: deleted, ...objectWithoutDeletedProp } = prevMap;
            objectWithoutDeletedProp[newX + ',' + newY] = currentPointNeighbours;
            originalElementCoords.current = newX + ',' + newY;
            return objectWithoutDeletedProp;
        })
    }

    const startDraggingPoint = (event: any) => {
        if (editorMode !== EDITOR_MODES.MOVING_POINTS || !event.target.classList.contains('draggable')) return;
        const currentPointCoords = event.target.getAttribute('cx') + ',' + event.target.getAttribute('cy');
        originalElementCoords.current = currentPointCoords;
        selectedElement.current = event.target;
    }

    const onDragEnds = () => {
        if (editorMode !== EDITOR_MODES.MOVING_POINTS || (!originalElementCoords.current && !selectedElement.current)) return;
        originalElementCoords.current = null;
        selectedElement.current = null;
    }

    const changeScaleFactor = (event: any) => {
        const changeFactor = parseInt(event.target.value);
        setRouteScale(changeFactor)
    }

    const getLineClassByMode = React.useCallback(() => {
        switch (editorMode) {
            case EDITOR_MODES.ADDING_POINTS: return 'adding-points';
            case EDITOR_MODES.CONNECTING_POINTS: return 'disabled-cursor';
            case EDITOR_MODES.MOVING_POINTS: return 'disabled-cursor';
            case EDITOR_MODES.SELECTING_ENTRY_POINT: return 'disabled-cursor';
            case EDITOR_MODES.DELETING: return 'delete-cursor removable-lines-color';
            default: return '';
        }
    }, [editorMode])

    const getSVGClassByMode = React.useCallback(() => {
        switch (editorMode) {
            case EDITOR_MODES.ADDING_POINTS: return 'adding-points';
            case EDITOR_MODES.CONNECTING_POINTS: return 'disabled-cursor';
            case EDITOR_MODES.MOVING_POINTS: return 'disabled-cursor';
            case EDITOR_MODES.DELETING: return 'disabled-cursor';
            case EDITOR_MODES.SELECTING_ENTRY_POINT: return 'disabled-cursor';
            default: return '';
        }
    }, [editorMode])

    const getPointClassByMode = React.useCallback(() => {
        switch (editorMode) {
            case EDITOR_MODES.ADDING_POINTS: return 'disabled-cursor';
            case EDITOR_MODES.MOVING_POINTS: return 'draggable';
            case EDITOR_MODES.CONNECTING_POINTS: return 'click-cursor connecting-points-color';
            case EDITOR_MODES.SELECTING_ENTRY_POINT: return 'click-cursor';
            case EDITOR_MODES.DELETING: return 'delete-cursor removable-points-color';
            default: return '';
        }
    }, [editorMode])

    const showMapEditor = React.useMemo(() => {
        switch (editorMode) {
            case EDITOR_MODES.ADDING_POINTS: return true;
            case EDITOR_MODES.MOVING_POINTS: return true;
            case EDITOR_MODES.CONNECTING_POINTS: return true;
            case EDITOR_MODES.DELETING: return true;
            case EDITOR_MODES.SELECTING_ENTRY_POINT: return true;
            default: return false;
        }
    }, [editorMode])

    const mapStyles = React.useMemo(() => {
        return {
            cursor: '',
            backgroundImage: `url(${(shop && shop.mapImage) || ''})`,
        }
    }, [shop])

    const onSaveMap = () => {
        const newShopData = { ...shop, map: JSON.stringify(adjList), mapEntryPoint: entryPoint }
        dispatch(updateShop(newShopData))
    }

    const handleModeChange = (event: React.MouseEvent<HTMLElement>, newMode: string | null) => {
        setEditorMode(newMode);
    };

    return (
        <>
            <Grid container spacing={4} className={classes.root}>
                <Grid item xs={12} className={classes.mapGrid}>
                    <Typography variant="h4">{shop.name}</Typography>
                    <Typography variant="h5">{shop.address}</Typography>
                    <div className="map-editor-wrapper">
                        <div className="map" style={mapStyles}>
                            <svg ref={svgRef} className={getSVGClassByMode()} onMouseDown={startDraggingPoint} onMouseMove={dragPoint} onMouseUp={onDragEnds} onClick={addPoint} version="1.1" viewBox="0.0 0.0 500.0 488.0" fill="none" stroke="none" >
                                {showMapEditor &&
                                    <g id="lines">
                                        {Object.keys(adjList).map((vertex) => {
                                            const [x1, y1] = vertex.split(',');
                                            const edjes = adjList[vertex];
                                            return edjes.map((edje: { coord: string, weight: string }) => {
                                                const [x2, y2] = edje.coord.split(',');
                                                return <line onClick={lineAction} className={getLineClassByMode()} key={'(' + x1 + ',' + y1 + ')' + '(' + x2 + ',' + y2 + ')'} x1={x1} x2={x2} y1={y1} y2={y2} strokeLinecap="round" stroke={LINE_COLOR} strokeWidth={routeScale}></line>
                                            })
                                        })}
                                    </g>
                                }
                                {showMapEditor &&
                                    <g id="points">
                                        {Object.keys(adjList).map((vertex, index) => {
                                            const [x1, y1] = vertex.split(',');
                                            return <circle className={getPointClassByMode()} onClick={pointAction} key={'(' + x1 + ',' + y1 + ')'} cx={x1} cy={y1} r={routeScale} fill={entryPoint === vertex ? ENTRY_POINT_COLOR : POINT_COLOR} stroke={POINT_STROKE}></circle>
                                        })}
                                    </g>
                                }
                                <g id="product-points">
                                    {products.map((vertex: string, index: number) => {
                                        const [x1, y1] = vertex.split(',');
                                        return (
                                            <React.Fragment key={'(' + x1 + ',' + y1 + ')'}>
                                                <circle cx={x1} cy={y1} r={routeScale} fill={PRODUCT_COLOR} stroke={POINT_STROKE}></circle>
                                                <text x={x1} y={y1} fontSize={routeScale * 2.5} textAnchor="middle" stroke="black" strokeWidth="1px" dy=".3em">{index}</text>
                                            </React.Fragment>
                                        )
                                    })}
                                </g>
                            </svg>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.mapGrid}>
                    <ToggleButtonGroup
                        value={editorMode}
                        exclusive
                        onChange={handleModeChange}
                    >
                        <ToggleButton value={EDITOR_MODES.ADDING_POINTS} aria-label="left aligned">
                            <CreateIcon />
                        </ToggleButton>
                        <ToggleButton value={EDITOR_MODES.CONNECTING_POINTS} aria-label="centered">
                            <LinearScaleIcon />
                        </ToggleButton>
                        <ToggleButton value={EDITOR_MODES.MOVING_POINTS} aria-label="right aligned">
                            <OpenWithIcon />
                        </ToggleButton>
                        <ToggleButton value={EDITOR_MODES.DELETING} aria-label="justified">
                            <DeleteForeverOutlinedIcon />
                        </ToggleButton>
                        <ToggleButton value={EDITOR_MODES.SELECTING_ENTRY_POINT} aria-label="justified">
                            <TransitEnterexitIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={12} className={classes.mapGrid}>
                    <Typography variant="subtitle1"> Editor Mode: {editorMode}</Typography>
                </Grid>
                <Grid item xs={12} className={classes.mapGrid}>
                    <div>
                        <label htmlFor="route-scale">Current route scale:</label>
                        <input onChange={changeScaleFactor} type="range" id="route-scale" name="points" min="3" max="10" step="1" value={routeScale} />
                        {routeScale}
                    </div>                </Grid>
                <Grid item xs={12} className={classes.mapGrid}>
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={onSaveMap}
                        className={classes.submit}
                    >
                        Save Map
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default MapEditor;