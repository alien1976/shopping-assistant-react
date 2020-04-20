import * as React from 'react';
import { ShopsProvider } from "../services/shops.service"
import { ProductsProvider } from "../services/products.service"
import PopularShops from "./Shops/PopularShops"
import LatestProducts from './Products/LatestProducts';
import { Switch, Route } from "react-router-dom";

const Home = () => {
    return (
        <>
            <ShopsProvider>
                <PopularShops></PopularShops>
            </ShopsProvider>
            <ProductsProvider>
                <LatestProducts></LatestProducts>
            </ProductsProvider>
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
            <Switch>
                <Route exact path="/">
                    <Home></Home>
                </Route>
                <Route component={NotFound} />
            </Switch>
        </div>
    )
}

export default AppContainer;