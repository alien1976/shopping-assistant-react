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
import { updateProduct, selectProducts } from '../../../redux/productsReducer';

// import ShopMap from './shopMap.svg'
const EDITOR_MODES = {
    ADDING_POINTS: 'Add points',
    CONNECTING_POINTS: 'Connect points',
    MOVING_POINTS: 'Move points',
    DELETING: 'Delete points',
    ADD_PRODUCT: 'addingProduct',
    CONNECT_PRODUCT: 'connectingProducts',
    FINDING_PATH: 'findingPath'
}

let startPoint: any = [];
let endPoint = [];
let selectedPoint: any = null;
const POINT_COLOR = 'gray';
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

const MapProductPositionEditor = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { id } = useParams();
    const shops = useSelector(selectShops);
    const products = useSelector(selectProducts);

    const product = React.useMemo(() => {
        if (!products || !products.length) return null;

        return products.find((el) => el.id === id) as IProduct
    }, [products]);

    const shop = React.useMemo(() => {
        if (!shops || !shops.length || !product) return null;

        return shops.find((el) => el.id === product.shopId) as IShop
    }, [shops, product]);

    const [productCoordinates, setProductCoordinates] = React.useState('0,0');

    React.useEffect(() => {
        if (!product) return;

        setProductCoordinates(product.coordinates);
    }, [product])

    const [routeScale, setRouteScale] = React.useState(5);
    const originalElementCoords = React.useRef(null);
    const selectedElement = React.useRef(null);
    const svgRef = React.useRef(null);
    const dragPoint = (event: any) => {
        if (!originalElementCoords.current) return;
        event.preventDefault();
        const dim = svgRef.current.getBoundingClientRect();
        const newX = event.clientX - dim.left;
        const newY = event.clientY - dim.top;
        setProductCoordinates(newX + ',' + newY);
    }

    const startDraggingPoint = (event: any) => {
        if (!event.target.classList.contains('draggable')) return;
        const currentPointCoords = event.target.getAttribute('cx') + ',' + event.target.getAttribute('cy');
        originalElementCoords.current = currentPointCoords;
        selectedElement.current = event.target;
    }

    const onDragEnds = () => {
        if (!originalElementCoords.current && !selectedElement.current) return;
        originalElementCoords.current = null;
        selectedElement.current = null;
    }

    const changeScaleFactor = (event: any) => {
        const changeFactor = parseInt(event.target.value);
        setRouteScale(changeFactor)
    }

    const mapStyles = React.useMemo(() => {
        return {
            cursor: '',
            backgroundImage: `url(${(shop && shop.mapImage) || ''})`,
        }
    }, [shop])

    const onSaveProductLocation = () => {
        const newProductData = { ...product, coordinates: productCoordinates }
        dispatch(updateProduct(newProductData))
    }

    const [x1, y1] = productCoordinates.split(',')

    return (
        <Grid container spacing={4} className={classes.root}>
            <Grid item xs={12} className={classes.mapGrid}>
                <Typography variant="h4">{shop && shop.name}</Typography>
                <Typography variant="h5">{shop && shop.address}</Typography>
                <Typography variant="h5">Product: {product && product.name}</Typography>
                <div className="map-editor-wrapper">
                    <div className="map" style={mapStyles}>
                        <svg ref={svgRef} className='disabled-cursor' onMouseDown={startDraggingPoint} onMouseMove={dragPoint} onMouseUp={onDragEnds} version="1.1" viewBox="0.0 0.0 500.0 488.0" fill="none" stroke="none" >
                            {<g id='all-products'>
                                {products.map((el) => {
                                    const [x1, y1] = el.coordinates.split(',');
                                    return <circle key={el.id} cx={x1} cy={y1} r={routeScale} fill={POINT_COLOR} stroke={POINT_STROKE}></circle>
                                })}
                            </g>}
                            <circle className='draggable' cx={x1} cy={y1} r={routeScale + 2} fill={PRODUCT_COLOR} stroke={POINT_STROKE}></circle>
                        </svg>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} className={classes.mapGrid}>
                <div>
                    <label htmlFor="route-scale">Current route scale:</label>
                    <input onChange={changeScaleFactor} type="range" id="route-scale" name="points" min="3" max="10" step="1" value={routeScale} />
                    {routeScale}
                </div>
            </Grid>
            <Grid item xs={12} className={classes.mapGrid}>
                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={onSaveProductLocation}
                    className={classes.submit}
                >
                    Save product location
                </Button>
            </Grid>
        </Grid >
    )
}

export default MapProductPositionEditor;