import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardLoader from '../Loaders/CardLoader';
import { useParams } from 'react-router-dom';
import { Paper, Grid } from '@material-ui/core';
import { IProduct, IShop, IShopBrand } from '../../globals/interfaces';
import { useProducts } from '../../services/products.service';
import ItemLoader from '../Loaders/ItemLoader';
import { useShops } from '../../services/shops.service';
import { useShopBrands } from '../../services/shopBrands.service';
import ShopProducts from './ShopProducts';

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
    const shops = useShops();
    const shopBrands = useShopBrands();
    let { id } = useParams();
    const shopId = parseInt(id)
    const [shop, setShop] = React.useState(null);
    const [shopProducts, setShopProducts] = React.useState(null);
    const [shopBrand, setShopBrand] = React.useState(null);

    React.useEffect(() => {
        shops.getShop(shopId).then((shop: IShop) => {
            setShop(shop);
            return shopBrands.getShopBrand(shop.shopBrandId);
        }).then((shopBrand: IShopBrand) => {
            setShopBrand(shopBrand);
            return products.getAllProductsByShopId(shopId)
        }).then((products: IProduct[]) => {
            setShopProducts(products);
        })
    }, [])

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