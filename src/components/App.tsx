import * as React from 'react';
import { hot } from 'react-hot-loader';
import LatestProducts from './Products/LatestProducts';
import { ProductsProvider } from '../services/products.service';

const App = () => {
    return (
        <ProductsProvider>
            <LatestProducts></LatestProducts>
        </ProductsProvider>
    )
}

export default hot(module)(App);