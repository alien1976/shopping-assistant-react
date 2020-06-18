import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { CARD_WIDTH, CARD_HEIGHT } from '../../globals/constants';
import CardLoader from '../Loaders/CardLoader';
import { Link } from 'react-router-dom';
import { addProductToCart, removeProductFromCart } from '../../redux/cartReducer';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreState } from '../../redux/store';
import { IProduct } from '../../globals/interfaces';
import { selectLoggedIn } from '../../redux/authenticationReducer';
import { addProductToFavorites, selectUserFavoritesProducts, removeProductFromFavorites } from '../../redux/userReducer';

const useStyles = makeStyles({
    root: {
        width: CARD_WIDTH,
        position: 'relative',
        marginBottom: 10,
        borderRadius: 0,
        background: 'none'
    },
    media: {
        position: 'relative',
        height: CARD_HEIGHT,
        backgroundSize: 'cover'
    },
    content: {
        width: '90%',
        bottom: 0,
        position: 'absolute',
        backgroundColor: 'rgb(0, 0, 0, 0.3)',
        display: 'flex',
        background: 'none'
    },
    title: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: 'white'
    },
    title2: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: '#dedede'
    },
    infoHolder: {
        width: '80%'
    },
    cardActions: {
        width: '25%',
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center'
    },
    iconButton: {
        color: 'white'
    }
});

interface IProductCardProps {
    product: IProduct
}

const ProductCard = ({ product }: IProductCardProps) => {
    const { image, id, name, price } = product;
    const classes = useStyles();
    const isInCart = useSelector((state: IStoreState) => state.appState.cart.indexOf(id.toString()) !== -1);
    const favoriteProducts = useSelector(selectUserFavoritesProducts);
    const isProductInFavorite = React.useMemo(() => {
        if (!favoriteProducts) return false;

        return favoriteProducts.indexOf(product.id) !== -1;
    }, [favoriteProducts]);

    const dispatch = useDispatch();
    const isUserLogged = useSelector(selectLoggedIn);
    const mediaLoaded = !!image && !!name;

    const productToCartToggle = () => {
        if (isInCart) {
            dispatch(removeProductFromCart(id.toString()));
        } else {
            dispatch(addProductToCart(id.toString()));
        }
    }

    const addToFavorites = () => {
        if (!isProductInFavorite) {
            dispatch(addProductToFavorites(product.id))
        } else {
            dispatch(removeProductFromFavorites(product.id))
        }
    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                {!mediaLoaded ?
                    <div className={classes.media}>
                        <CardLoader loaded={mediaLoaded} />
                    </div> :
                    <Link to={`/products/${id}`}>
                        <CardMedia
                            className={classes.media}
                            image={image}
                            title={name}
                            component="div"
                        />
                    </Link>
                }
            </CardActionArea>
            <CardContent className={classes.content}>
                <div className={classes.infoHolder}>
                    <Typography gutterBottom variant="body1" component='h5' title={name} className={classes.title}>
                        {name || '...'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.title2}>
                        {price || '...'} lv.
                </Typography>
                </div>
                <CardActions className={classes.cardActions}>
                    {isUserLogged && <IconButton onClick={addToFavorites} aria-label="delete" size="small" className={classes.iconButton}>
                        {isProductInFavorite ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>}
                    <IconButton aria-label="add-to-cart" size="small" onClick={productToCartToggle} className={classes.iconButton}>
                        {isInCart ?
                            <ShoppingCartIcon />
                            : <ShoppingCartOutlinedIcon />}
                    </IconButton>
                </CardActions>
            </CardContent>
        </Card >
    )
}

export default React.memo(ProductCard);