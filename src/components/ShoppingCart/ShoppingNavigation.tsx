import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Paper, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import { IProduct, IShop } from '../../globals/interfaces';
import ItemLoader from '../Loaders/ItemLoader';
import ProductLocationMap from '../Map/ProductLocationMap';
import { useDispatch, useSelector } from 'react-redux';
import { removeProductFromCart, addProductToCart, selectFastestPath, setFastestPath } from '../../redux/cartReducer';
import { useParams, useLocation } from 'react-router-dom';
import MapPathFinder from '../Map/MapPathFinder';
import { addProductToUserCart, removeProductFromUserCart } from '../../redux/userReducer';
import { selectLoggedIn } from '../../redux/authenticationReducer';

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
            flexFlow: 'column',
            // justifyContent: 'center',
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

    if (!location.state) {
        return <h1>Invalid URL.</h1>
    }

    const fastestPath = useSelector(selectFastestPath);
    const shop = location.state.shop;
    const classes = useStyles();
    const dispatch = useDispatch();
    const isUserLogged = useSelector(selectLoggedIn);
    const findingPath = React.useRef(false);
    const startPoint = React.useRef(shop.mapEntryPoint);
    const [loadProcess, setLoadProcess] = React.useState(false);
    const [availableProducts, setAvailableProducts] = React.useState(location.state.products.filter((el) => !el.bought));
    const [boughtProducts, setBoughtProducts] = React.useState(location.state.products.filter((el) => el.bought));

    const changeAvailableProductsOrder = () => {
        const reorderedProducts: (IProduct & { bought: boolean })[] = [];

        for (let product of fastestPath) {
            const availableProduct = availableProducts.find((el) => el.coordinates === product);
            if (availableProduct && reorderedProducts.findIndex((el) => el.id === availableProduct.id) === -1) {
                reorderedProducts.push(availableProduct)
            }
        }

        return reorderedProducts;
    }

    const [orderedAvailableProducts, setOrderedAvailableProducts] = React.useState(changeAvailableProductsOrder());

    React.useEffect(() => {
        if (!boughtProducts.length) startPoint.current = shop.mapEntryPoint;
        // else startPoint.current = orderedAvailableProducts[0].coordinates;
    }, [boughtProducts])

    React.useEffect(() => {
        setOrderedAvailableProducts(changeAvailableProductsOrder())
    }, [fastestPath, availableProducts])

    React.useEffect(() => {
        findPath();
    }, [availableProducts]);

    const findPath = React.useCallback(() => {
        if (findingPath.current) return;
        setLoadProcess(true);
        findingPath.current = true;
        const pathGeneratorWorker = new Worker('./PathGenerator.worker.js');
        pathGeneratorWorker.onerror = (error) => {
            findingPath.current = false;
            pathGeneratorWorker.terminate();
            setLoadProcess(false);
            console.log(error)
        }
        pathGeneratorWorker.onmessage = (e) => {
            if (!e.data.finish) {
                return;
            }
            dispatch(setFastestPath(e.data.path))
            pathGeneratorWorker.terminate();
            findingPath.current = false;
            setLoadProcess(false);
        }
        console.log(availableProducts)
        pathGeneratorWorker.postMessage({ mapPath: JSON.parse(shop.map), mapEntryPoint: startPoint.current, products: availableProducts.map((el) => el.coordinates) });
    }, [availableProducts])

    const toggleProduct = (event: React.MouseEvent<HTMLLIElement>) => {
        if (findingPath.current) return;
        const productId = event.currentTarget.dataset.id;
        const productIsAvailable = event.currentTarget.dataset.isavailable === 'true';
        const product = productIsAvailable ?
            availableProducts.find((el) => el.id === productId) :
            boughtProducts.find((el) => el.id === productId);

        startPoint.current = product.coordinates;

        if (productIsAvailable) {
            setAvailableProducts(availableProducts.filter((el) => el.id !== productId));
            setBoughtProducts([product, ...boughtProducts]);
            !isUserLogged ? dispatch(removeProductFromCart(product.id.toString())) : dispatch(removeProductFromUserCart(product.id.toString()));
        } else {
            setBoughtProducts(boughtProducts.filter((el) => el.id !== productId));
            setAvailableProducts([product, ...availableProducts]);
            !isUserLogged ? dispatch(addProductToCart(product.id.toString())) : dispatch(addProductToUserCart(product.id.toString()));
        }

    }

    const mediaLoaded = !!availableProducts && !!boughtProducts;

    return (
        <div className={classes.root}>
            {mediaLoaded ?
                <Paper className={classes.paper}>
                    <Typography variant="h5">Currently shopping in: {shop.name}</Typography>
                    <Typography>{shop.address}</Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={8} lg={6} className={classes.mapGrid}>
                            <MapPathFinder
                                mapImgUrl={shop.mapImage}
                                products={orderedAvailableProducts.map((el) => el.coordinates)}
                                loadProcess={loadProcess}
                                startPoint={startPoint.current} />
                        </Grid>
                        <Grid item xs={12} md={4} lg={6}>
                            <Typography variant='h5' className={classes.label}>Products to buy:</Typography>
                            <Typography className={classes.label}>Total products price: {availableProducts.reduce((a, b) => a + b.price, 0)} lv.</Typography>
                            <List>
                                {orderedAvailableProducts.map((product: IProduct, index: number) => {
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
                                    </ListItem>)
                                })}
                            </List>
                            <Typography variant='h5' className={classes.label}>Bought products:</Typography>
                            <Typography className={classes.label}>Total money spent: {boughtProducts.reduce((a, b) => a + b.price, 0)} lv.</Typography>
                            <List>
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
                                    </ListItem>)
                                })}
                            </List>
                        </Grid>
                    </Grid>
                </Paper>
                : <ItemLoader loadingMessage="Preparing shopping cart. Please wait..." />}
        </div>
    )
}

export default React.memo(ShoppingNavigation);