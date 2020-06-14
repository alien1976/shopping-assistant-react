import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardLoader from '../Loaders/CardLoader';
import { useParams } from 'react-router-dom';
import { Paper, Grid } from '@material-ui/core';
import { IProduct } from '../../globals/interfaces';
import { useProducts } from '../../services/products.service';
import ItemLoader from '../Loaders/ItemLoader';
import ShopProducts from './ShopProducts';
import { selectShops } from '../../redux/shopsReducer';
import { useSelector } from 'react-redux';
import { selectShopBrands } from '../../redux/shopBrandsReducer';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            background: 'none',
            color: 'white'
        },
        image: {
            width: 128,
            height: 128,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '200px',
        },
    }),
);

const Shop = () => {
    const classes = useStyles();
    const products = useProducts();
    const shops = useSelector(selectShops);
    const shopBrands = useSelector(selectShopBrands);
    let { id } = useParams();
    const shopId = parseInt(id)
    const [shop, setShop] = React.useState(null);
    const [shopProducts, setShopProducts] = React.useState(null);
    const [shopBrand, setShopBrand] = React.useState(null);

    React.useEffect(() => {
        if (!shops || !shops.length) return;

        const shop = shops.find((el) => el.id === id);

        if (!shop || !shopBrands || !shopBrands.length) return;

        const shopBrand = shopBrands.find((el) => el.id === shop.shopBrandId)

        setShop(shop);
        setShopBrand(shopBrand);

        products.getAllProductsByShopId(shopId).then((products: IProduct[]) => {
            setShopProducts(products);
        })
    }, [shopBrands, shops])

    const mediaLoaded = !!shop && !!shopProducts && !!shopBrand;

    return (
        <div className={classes.root}>
            {mediaLoaded ?
                <>
                    <Paper className={classes.paper}>
                        <Grid container spacing={4}>
                            <Grid item>
                                {shop && shopBrand.image ?
                                    <img className={classes.img} alt="complex" src={shopBrand.image} />
                                    : <div>
                                        <CardLoader loaded={shop && shopBrand.image} />
                                    </div>}
                            </Grid>
                            <Grid item xs={12} sm={12} md container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="h4">
                                            {shop.name}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Description: {shop.description}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1" gutterBottom>
                                            Shop address:
                                    </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {shop.address}
                                        </Typography>
                                        <Grid item>
                                            <div className="mapouter">
                                                <div className="gmap_canvas">
                                                    <iframe width="100%" height="550" id="gmap_canvas" src={shop.shopGoogleMapsSrc} frameBorder="0" scrolling="yes" marginHeight={0} marginWidth={0}></iframe>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                    <ShopProducts allProducts={shopProducts}></ShopProducts>
                </>
                : <ItemLoader loadingMessage="Loading shop info. Please wait..." />}
        </div>
    )
}

export default React.memo(Shop);