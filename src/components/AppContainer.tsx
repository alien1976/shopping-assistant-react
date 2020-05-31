import * as React from 'react';
import PopularShops from "./Shops/PopularShops"
import LatestProducts from './Products/LatestProducts';
import { Switch, Route } from "react-router-dom";
import AllProducts from './AllProducts/AllProducts';
import Product from './Products/Product';
import { ProductsProvider } from '../services/products.service';
import { ShopBrandsProvider } from '../services/shopBrands.service';
import { ShopsProvider } from '../services/shops.service';
import ShoppingCart from './ShoppingCart/ShoppingCart';
import ShoppingNavigation from './ShoppingCart/ShoppingNavigation';
import AllShops from './AllShops/AllShops';
import Shop from './Shops/Shop';

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
                            <Route component={NotFound} />
                        </Switch>
                    </ShopsProvider>
                </ShopBrandsProvider>
            </ProductsProvider>
        </div>
    )
}

export default AppContainer;