import * as React from 'react';
import '../Map.css'
import { IShop, IProduct } from '../../../globals/interfaces';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreState } from '../../../redux/store';
import { selectShops } from '../../../redux/shopsReducer';
import { makeStyles, createStyles } from '@material-ui/core';
import MapEditorDocument from './MapEditorDocument';
import MapEditorPanel from './MapEditorPanel';
import { setAdjList, setEntryPoint, setMapShop, setMapProducts } from '../../../redux/mapReducer';

const useStyles = makeStyles(() =>
    createStyles({
        mapEditorContainer: {
            display: 'flex',
            height: 'calc(100vh - 60px)'
        },
    }),
);

const MapEditor = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { id } = useParams();
    const shops = useSelector(selectShops);

    const shop = React.useMemo(() => {
        if (!shops || !shops.length) return null;

        return shops.find((el) => el.id === id) as IShop
    }, [shops]);

    React.useEffect(() => {
        if (!shop) return;

        dispatch(setAdjList(JSON.parse(shop.map)));
        dispatch(setEntryPoint(shop.mapEntryPoint || '0,0'));
        dispatch(setMapShop(shop));
    }, [shop])

    const shopProducts = useSelector((state: IStoreState) => state.productsState.products.filter((el) => el.shopId === id)) as IProduct[]

    React.useEffect(() => {
        if (!shopProducts || !shopProducts.length) return;

        dispatch(setMapProducts(shopProducts));
    }, [shop])

    return (
        <div className={classes.mapEditorContainer}>
            <MapEditorDocument />
            <MapEditorPanel />
        </div>
    )
}

export default MapEditor;