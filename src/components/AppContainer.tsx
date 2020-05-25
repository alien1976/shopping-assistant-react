import * as React from 'react';
import PopularShops from "./Shops/PopularShops"
import LatestProducts from './Products/LatestProducts';
import { Switch, Route } from "react-router-dom";
import AllProducts from './AllProducts/AllProducts';
import Product from './Products/Product';
import { ProductsProvider } from '../services/products.service';
import { ShopBrandsProvider } from '../services/shopBrands.service';
import { ShopsProvider } from '../services/shops.service';

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
                            <Route component={NotFound} />
                        </Switch>
                    </ShopsProvider>
                </ShopBrandsProvider>
            </ProductsProvider>
        </div>
    )
}

export default AppContainer;