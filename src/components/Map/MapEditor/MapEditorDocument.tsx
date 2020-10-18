import * as React from 'react';
import '../Map.css'
import { findEdjeIndex } from '../MapUtils'
import { IMap } from '../../../globals/interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, makeStyles, createStyles } from '@material-ui/core';
import { EDITOR_MODES } from '../../../globals/constants';
import { selectAdjList, selectMapShop, selectEditorMode, selectEntryPoint, setEntryPoint, selectMapScale, selectMapProducts, moveCurrentPoint, removePointFromMap, addMapEdje, addMapVertex, addPointBetweenOtherTwoMap, removeLineMap } from '../../../redux/mapReducer';

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
        mapEditorContainer: {
            display: 'flex',
            height: 'calc(100vh - 60px)'
        },
        root: {
            width: '100%',
            background: 'black'
        },
        mapGrid: {
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center'
        }
    }),
);

const MapEditorDocument = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const editorMode = useSelector(selectEditorMode);
    const entryPoint = useSelector(selectEntryPoint);
    const adjList = useSelector(selectAdjList) as IMap;
    const mapScale = useSelector(selectMapScale)
    const mapProducts = useSelector(selectMapProducts);
    const mapShop = useSelector(selectMapShop);
    const originalElementCoords = React.useRef(null);
    const selectedElement = React.useRef(null);
    const svgRef = React.useRef(null);

    const addVertex = (point: string) => {
        if (adjList[point]) return;
        dispatch(addMapVertex({ point: point }));
    }

    const addEdge = (point1: string, point2: string) => {
        dispatch(addMapEdje({ point1: point1, point2: point2 }))
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

        dispatch(addPointBetweenOtherTwoMap({ point1: point1, point2: point2, newPoint: newPoint }));
    }

    const removeLine = (event: any) => {
        const point1 = event.currentTarget.getAttribute('x1') + ',' + event.currentTarget.getAttribute('y1')
        const point2 = event.currentTarget.getAttribute('x2') + ',' + event.currentTarget.getAttribute('y2');

        dispatch(removeLineMap({ point1: point1, point2: point2 }));
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

        dispatch(removePointFromMap({ x: x, y: y }))
    }

    const changeEntryPoint = (event: any) => {
        const x = event.currentTarget.getAttribute('cx');
        const y = event.currentTarget.getAttribute('cy');

        dispatch(setEntryPoint(x + ',' + y));
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
        dispatch(moveCurrentPoint({ newX: newX.toString(), newY: newY.toString(), currentPointCoords: currentPointCoords }))
        originalElementCoords.current = newX + ',' + newY;
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

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.mapGrid}>
                <div className="map-editor-wrapper">
                    <svg ref={svgRef} className={getSVGClassByMode()} onMouseDown={startDraggingPoint} onMouseMove={dragPoint} onMouseUp={onDragEnds} onClick={addPoint} version="1.1" viewBox="0.0 0.0 500.0 488.0" fill="none" stroke="none" >
                        <image x="0" y="0" width="100%" height="100%" xlinkHref={mapShop.mapImage} />
                        {showMapEditor &&
                            <g id="lines">
                                {Object.keys(adjList).map((vertex) => {
                                    const [x1, y1] = vertex.split(',');
                                    const edjes = adjList[vertex];
                                    return edjes.map((edje: { coord: string, weight: number }) => {
                                        const [x2, y2] = edje.coord.split(',');
                                        return <line onClick={lineAction} className={getLineClassByMode()} key={'(' + x1 + ',' + y1 + ')' + '(' + x2 + ',' + y2 + ')'} x1={x1} x2={x2} y1={y1} y2={y2} strokeLinecap="round" stroke={LINE_COLOR} strokeWidth={mapScale}></line>
                                    })
                                })}
                            </g>
                        }
                        {showMapEditor &&
                            <g id="points">
                                {Object.keys(adjList).map((vertex, index) => {
                                    const [x1, y1] = vertex.split(',');
                                    return <circle className={getPointClassByMode()} onClick={pointAction} key={'(' + x1 + ',' + y1 + ')'} cx={x1} cy={y1} r={mapScale} fill={entryPoint === vertex ? ENTRY_POINT_COLOR : POINT_COLOR} stroke={POINT_STROKE}></circle>
                                })}
                            </g>
                        }
                        <g id="product-points">
                            {mapProducts.map((el, index: number) => {
                                const [x1, y1] = el.coordinates.split(',');
                                return (
                                    <React.Fragment key={'(' + x1 + ',' + y1 + ')'}>
                                        <circle cx={x1} cy={y1} r={mapScale} fill={PRODUCT_COLOR} stroke={POINT_STROKE}></circle>
                                        <text x={x1} y={y1} fontSize={mapScale * 2.5} textAnchor="middle" stroke="black" strokeWidth="1px" dy=".3em">{index}</text>
                                    </React.Fragment>
                                )
                            })}
                        </g>
                    </svg>
                </div>
            </Grid>
        </Grid>
    )
}

export default MapEditorDocument;