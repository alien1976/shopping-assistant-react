import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Paper, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import { IProduct, IShop } from '../../globals/interfaces';
import ItemLoader from '../Loaders/ItemLoader';
import ProductLocationMap from '../Map/ProductLocationMap';
import { useDispatch } from 'react-redux';
import { removeProductFromCart, addProductToCart } from '../../redux/cartReducer';
import { useParams, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            color: 'inherit'
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
        avatar: {
            width: 'inherit'
        },
        listItem: {
            borderRadius: '5px',
            marginTop: '5px',
            backgroundColor: '#6aa84f',
            cursor: 'pointer'
        },
        listItemBought: {
            borderRadius: '5px',
            marginTop: '5px',
            backgroundColor: '#868686',
            cursor: 'pointer'
        },
        listItemText: {
            color: 'rgba(255, 255, 255, 0.9)'
        },
        title: {
            margin: theme.spacing(4, 0, 2),
        },
        formControl: {
            color: 'white',
            minWidth: 120,
        },
        selectShop: {
            color: 'white',
            borderColor: 'white',
            width: 'inherit'
        },
        label: {
            color: 'white',
            width: 'inherit'
        },
        mapGrid: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }),
);

interface IShoppingNavigationProps {
    products: (IProduct & { bought: boolean })[]
    shop: IShop
}

const ShoppingNavigation = () => {
    const location = useLocation<IShoppingNavigationProps>();
    console.log('inn', location)
    const shop = location.state.shop;
    const classes = useStyles();
    const dispatch = useDispatch();
    const [availableProducts, setAvailableProducts] = React.useState(location.state.products.filter((el) => !el.bought));
    const [boughtProducts, setBoughtProducts] = React.useState(location.state.products.filter((el) => el.bought));

    const toggleProduct = (event: React.MouseEvent<HTMLLIElement>) => {
        const productId = parseInt(event.currentTarget.dataset.id);
        const productIsAvailable = event.currentTarget.dataset.isavailable === 'true';
        const product = productIsAvailable ?
            availableProducts.find((el) => el.id === productId) :
            boughtProducts.find((el) => el.id === productId);

        if (productIsAvailable) {
            setAvailableProducts(availableProducts.filter((el) => el.id !== productId));
            setBoughtProducts([product, ...boughtProducts]);
            dispatch(removeProductFromCart(product.id))
        } else {
            setBoughtProducts(boughtProducts.filter((el) => el.id !== productId));
            setAvailableProducts([product, ...availableProducts]);
            dispatch(addProductToCart(product.id))
        }
    }

    const mediaLoaded = !!availableProducts && !!boughtProducts;

    return (
        <div className={classes.root}>
            {mediaLoaded ?
                <Paper className={classes.paper}>
                    <Typography variant="h4">Currently shopping in: {shop.name}</Typography>
                    <Typography variant="h5">{shop.address}</Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={7} className={classes.mapGrid}>
                            <ProductLocationMap mapImgUrl={shop.mapImage} productCoordinates={(availableProducts && availableProducts[0] && availableProducts[0].coordinates) || '0,0'}></ProductLocationMap>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <List>
                                <Typography className={classes.label}>Products to buy:</Typography>
                                {availableProducts.map((product: IProduct, index: number) => {
                                    return (<ListItem onClick={toggleProduct} data-id={product.id} data-isavailable={true}
                                        key={product.id} className={classes.listItem}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <img className={classes.avatar} src={product.image}></img>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            className={classes.listItemText}
                                            primary={`${index + 1}. ${product.name}`}
                                            secondary={'Price:' + product.price}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete">
                                                {/* <DeleteIcon /> */}
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>)
                                })}
                            </List>
                            <Typography className={classes.label}>Total: {availableProducts.reduce((a, b) => a + b.price, 0)} lv.</Typography>
                            <List>
                                <Typography className={classes.label}>Bought products:</Typography>
                                {boughtProducts.map((product: IProduct, index: number) => {
                                    return (<ListItem onClick={toggleProduct} data-id={product.id} data-isavailable={false}
                                        key={product.id} className={classes.listItemBought}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <img className={classes.avatar} src={product.image}></img>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            className={classes.listItemText}
                                            primary={product.name}
                                            secondary={'Price:' + product.price}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete">
                                                {/* <DeleteIcon /> */}
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>)
                                })}
                            </List>
                            <Typography className={classes.label}>Spent: {boughtProducts.reduce((a, b) => a + b.price, 0)} lv.</Typography>
                        </Grid>
                    </Grid>
                </Paper>
                : <ItemLoader loadingMessage="Preparing shopping cart. Please wait..." />}
        </div>
    )
}

export default React.memo(ShoppingNavigation);