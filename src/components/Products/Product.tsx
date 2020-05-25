import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { CARD_WIDTH, CARD_HEIGHT } from '../../globals/constants';
import CardLoader from '../Loaders/CardLoader';
import { Link, useParams } from 'react-router-dom';
import { Paper, Grid, ButtonBase } from '@material-ui/core';
import { IProduct, IShop, IShopBrand } from '../../globals/interfaces';
import { useProducts } from '../../services/products.service';
import ItemLoader from '../Loaders/ItemLoader';

// const useStyles = makeStyles({
//     root: {
//         width: CARD_WIDTH,
//         position: 'relative',
//         marginBottom: 10,
//         borderRadius: 0,
//         background: 'none'
//     },
//     media: {
//         position: 'relative',
//         height: CARD_HEIGHT,
//         backgroundSize: 'cover'
//     },
//     content: {
//         width: '90%',
//         bottom: 0,
//         position: 'absolute',
//         backgroundColor: 'rgb(0, 0, 0, 0.3)',
//         display: 'flex',
//         background: 'none'
//     },
//     title: {
//         overflow: 'hidden',
//         textOverflow: 'ellipsis',
//         whiteSpace: 'nowrap',
//         color: 'white'
//     },
//     title2: {
//         overflow: 'hidden',
//         textOverflow: 'ellipsis',
//         whiteSpace: 'nowrap',
//         color: '#dedede'
//     },
//     infoHolder: {
//         width: '80%'
//     },
//     cardActions: {
//         width: '25%',
//         display: 'flex',
//         flexFlow: 'row',
//         alignItems: 'center'
//     },
//     iconButton: {
//         color: 'white'
//     }
// });

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

const Product = () => {
    const classes = useStyles();
    const products = useProducts();
    let { id } = useParams();
    const productId = parseInt(id)
    const [product, setProduct] = React.useState(null);
    const [productShop, setProductShop] = React.useState(null);
    const [productShopBrand, setProductShopBrand] = React.useState(null);

    React.useEffect(() => {
        products.getProduct(productId).then((product: IProduct) => {
            setProduct(product);
            return products.getProductShopBrand(productId);
        }).then((shopBrand: IShopBrand) => {
            setProductShopBrand(shopBrand);
            return products.getProductShop(productId)
        }).then((shop: IShop) => {
            setProductShop(shop);
        })
    }, [])

    const mediaLoaded = !!product && !!productShop && !!productShopBrand;

    return (
        <div className={classes.root}>
            {mediaLoaded ?
                <Paper className={classes.paper}>
                    <Grid container spacing={4}>
                        <Grid item>
                            {product && product.image ?
                                <img className={classes.img} alt="complex" src={product.image} />
                                : <div>
                                    <CardLoader loaded={product && product.image} />
                                </div>}
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Description: {product.description}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1" gutterBottom>
                                        Shop location:
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {productShopBrand.name}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {productShop.address}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" style={{ cursor: 'pointer', userSelect: 'none' }}>
                                        Add to chart
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1" gutterBottom>
                                        Shop location:
                                    </Typography>
                                    Map
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">Price: {product && product.price || '...'} lv.</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                : <ItemLoader loadingMessage="Loading product info. Please wait..." />}
        </div>
        // <Card className={classes.root}>
        /* <CardActionArea>
        {!mediaLoaded ?
            <div className={classes.media}>
            <CardLoader loaded={mediaLoaded} />
            </div> :
            <Link to={`/product/${productId}`}>
            <CardMedia
            className={classes.media}
                        image={productImage}
                        title={name}
                        component="div"
                    />
                </Link>
            }
        </CardActionArea>
        <CardContent className={classes.content}>
            <div className={classes.infoHolder}>
                <Typography gutterBottom variant="body1" component='h5' title={name} className={classes.title}>
                    {productName || '...'}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.title2}>
                    {productPrice || '...'} lv.
            </Typography>
            </div>
            <CardActions className={classes.cardActions}>
                <IconButton aria-label="delete" size="small" className={classes.iconButton}>
                    <StarBorderIcon />
                </IconButton>
                <IconButton aria-label="add-to-cart" size="small" className={classes.iconButton}>
                    <ShoppingCartOutlinedIcon />
                </IconButton>
            </CardActions>
        </CardContent> */
        // </Card >
    )
}

export default React.memo(Product);