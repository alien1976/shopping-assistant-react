import * as React from 'react';
import PopularShops from "./Shops/PopularShops"
import LatestProducts from './Products/LatestProducts';
import { Switch, Route, Redirect } from "react-router-dom";
import AllProducts from './AllProducts/AllProducts';
import Product from './Products/Product';
import ShoppingCart from './ShoppingCart/ShoppingCart';
import ShoppingNavigation from './ShoppingCart/ShoppingNavigation';
import AllShops from './AllShops/AllShops';
import Shop from './Shops/Shop';
import Login from './Users/Login';
import SignUp from './Users/SignUp';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedIn } from '../redux/authenticationReducer';
import Profile from './Users/Profile';
import { getUserData, selectUserRole } from '../redux/userReducer';
import { USER_ROLES } from '../globals/constants';
import { openSnackBar } from '../redux/snackBarReducer';
import UsersManager from './Users/UsersManager';
import ErrorBoundary from './ErrorBoundary';
import ShopBrandsManager from './Shops/ShopBrandsManager';
import ShopsManager from './Shops/ShopsManager';
import { getAllShopBrands } from '../redux/shopBrandsReducer';
import { getAllShops } from '../redux/shopsReducer';
import ProductsManager from './Products/ProductsManager';
import { getAllProducts } from '../redux/productsReducer';
import MapEditor from './Map/MapEditor/MapEditor';
import MapProductPositionEditor from './Map/MapEditor/MapProductPositionEditor';

const Home = () => {
    return (
        <>
            <PopularShops></PopularShops>
            <LatestProducts></LatestProducts>
        </>)
}

const NotFound = () => {
    return (
        <div>
            <h1>Not found</h1>
        </div>
    )
}

const AppContainer = () => {
    const isLoggedIn = useSelector(selectLoggedIn);
    const userRole = useSelector(selectUserRole);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getAllShopBrands());
        dispatch(getAllShops());
        dispatch(getAllProducts());

        if (isLoggedIn) {
            try {
                dispatch(getUserData(JSON.parse(localStorage.user).user.id))
            } catch (error) {
                console.error(error)
            }
        }
    }, [])

    return (
        <div id="container">
            <ErrorBoundary>
                <Switch>
                    <Route exact path="/">
                        <Home></Home>
                    </Route>
                    <Route path="/products/:id">
                        <Product></Product>
                    </Route>
                    <Route path="/products">
                        <AllProducts></AllProducts>
                    </Route>
                    <Route path="/shops/:id">
                        <Shop></Shop>
                    </Route>
                    <Route path="/shops">
                        <AllShops></AllShops>
                    </Route>
                    <Route path="/shopping-cart/:id">
                        <ShoppingNavigation></ShoppingNavigation>
                    </Route>
                    <Route path="/shopping-cart">
                        <ShoppingCart></ShoppingCart>
                    </Route>
                    <Route path="/login">
                        <Login></Login>
                    </Route>
                    <Route path="/sign-up">
                        <SignUp></SignUp>
                    </Route>
                    <Route path='/user-profile' render={props => (
                        !isLoggedIn ?
                            <Redirect to="/login" />
                            : <Profile />
                    )} />
                    <Route path='/users-manager' render={() => {
                        if (!isLoggedIn) return <Redirect to="/login" />
                        if (userRole !== USER_ROLES['Admin']) {
                            location.replace('/')
                            dispatch(openSnackBar({ message: 'You don\'t have rights to access this page!', status: 'warning' }));
                            return;
                        }

                        return <UsersManager />
                    }} />
                    <Route path='/shop-brands-manager' render={() => {
                        if (!isLoggedIn) return <Redirect to="/login" />
                        switch (userRole) {
                            case USER_ROLES['Admin']:
                            case USER_ROLES['Shop Owner']: return <ShopBrandsManager />
                            default: {
                                location.replace('/')
                                dispatch(openSnackBar({ message: 'You don\'t have rights to access this page!', status: 'warning' }));
                                return;
                            }
                        }
                    }} />
                    <Route path='/shops-manager' render={() => {
                        if (!isLoggedIn) return <Redirect to="/login" />
                        switch (userRole) {
                            case USER_ROLES['Admin']:
                            case USER_ROLES['Shop Manager']:
                            case USER_ROLES['Shop Owner']: return <ShopsManager />
                            default: {
                                location.replace('/')
                                dispatch(openSnackBar({ message: 'You don\'t have rights to access this page!', status: 'warning' }));
                                return;
                            }
                        }
                    }} />
                    <Route path='/products-manager' render={() => {
                        if (!isLoggedIn) return <Redirect to="/login" />
                        switch (userRole) {
                            case USER_ROLES['Admin']:
                            case USER_ROLES['Shop Manager']:
                            case USER_ROLES['Shop Owner']: return <ProductsManager />
                            default: {
                                location.replace('/')
                                dispatch(openSnackBar({ message: 'You don\'t have rights to access this page!', status: 'warning' }));
                                return;
                            }
                        }
                    }} />
                    <Route path='/shop-map-editor/:id' render={() => {
                        if (!isLoggedIn) return <Redirect to="/login" />
                        switch (userRole) {
                            case USER_ROLES['Admin']:
                            case USER_ROLES['Shop Manager']:
                            case USER_ROLES['Shop Owner']: return <MapEditor />
                            default: {
                                location.replace('/')
                                dispatch(openSnackBar({ message: 'You don\'t have rights to access this page!', status: 'warning' }));
                                return;
                            }
                        }
                    }} />
                    <Route path='/product-map-editor/:id' render={() => {
                        if (!isLoggedIn) return <Redirect to="/login" />
                        switch (userRole) {
                            case USER_ROLES['Admin']:
                            case USER_ROLES['Shop Manager']:
                            case USER_ROLES['Shop Owner']: return <MapProductPositionEditor />
                            default: {
                                location.replace('/')
                                dispatch(openSnackBar({ message: 'You don\'t have rights to access this page!', status: 'warning' }));
                                return;
                            }
                        }
                    }} />
                    <Route component={NotFound} />
                </Switch>
            </ErrorBoundary>
        </div>
    )
}

export default AppContainer;