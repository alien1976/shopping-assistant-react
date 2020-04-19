import * as React from 'react';
import { hot } from 'react-hot-loader';
import LatestProducts from './Products/LatestProducts';
import { ProductsProvider } from '../services/products.service';
import PopularShops from './Shops/PopularShops';
import { ShopsProvider } from '../services/shops.service';

const App = () => {
    return (
        <>
            <ShopsProvider>
                <PopularShops></PopularShops>
            </ShopsProvider>
            <ProductsProvider>
                <LatestProducts></LatestProducts>
            </ProductsProvider>
        </>
    )
}

export default hot(module)(App);