import * as React from 'react';
import PopularShops from "./Shops/PopularShops"
import LatestProducts from './Products/LatestProducts';
import { Switch, Route, Redirect } from "react-router-dom";
import AllProducts from './AllProducts/AllProducts';
import Product from './Products/Product';
import { ProductsProvider } from '../services/products.service';
import { ShopBrandsProvider } from '../services/shopBrands.service';
import { ShopsProvider } from '../services/shops.service';
import ShoppingCart from './ShoppingCart/ShoppingCart';
import ShoppingNavigation from './ShoppingCart/ShoppingNavigation';
import AllShops from './AllShops/AllShops';
import Shop from './Shops/Shop';
import Login from './Users/Login';
import SignUp from './Users/SignUp';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedIn } from '../redux/authenticationReducer';
import Profile from './Users/Profile';
import { getUserData } from '../redux/userReducer';

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
    const dispatch = useDispatch();
    if (isLoggedIn) {
        try {
            dispatch(getUserData(JSON.parse(localStorage.user).user.id))
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div id="container">
            <ProductsProvider>
                <ShopBrandsProvider>
                    <ShopsProvider>
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
                            <Route component={NotFound} />
                        </Switch>
                    </ShopsProvider>
                </ShopBrandsProvider>
            </ProductsProvider>
        </div>
    )
}

export default AppContainer;