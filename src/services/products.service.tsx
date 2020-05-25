import { timeout } from "../utils/utils";
import { PRODUCTS, SHOPS_BRANDS, SHOPS } from "../mock-data/shops";
import { IProduct } from "../globals/interfaces";

import * as React from 'react';

const { createContext, useContext } = React;

const ProductsContext = createContext(null);

export const ProductsProvider = (props: { children: React.ReactNode }) => {
    const value = {
        getAllProducts: getAllProducts,
        getProduct: getProduct,
        getProductShopBrand: getProductShopBrand,
        getProductShop: getProductShop,
        addProduct: addProduct,
        setProduct: setProduct,
        deleteProduct: deleteProduct
    };

    return (
        <ProductsContext.Provider value={value}>
            {props.children}
        </ProductsContext.Provider>
    )
};

export const useProducts = () => {
    return useContext(ProductsContext);
};

const getAllProducts = async () => {
    return PRODUCTS;
}

const getProduct = async (id: number) => {
    // await timeout(1000);
    const productIndex = PRODUCTS.findIndex((el) => el.id === id)
    return PRODUCTS[productIndex];
}

const getProductShopBrand = async (id: number) => {
    const shopBrandIndex = SHOPS_BRANDS.findIndex((el) => el.productsIds.indexOf(id) !== -1)
    return SHOPS_BRANDS[shopBrandIndex];
}

const getProductShop = async (id: number) => {
    const shopBrandIndex = SHOPS_BRANDS.findIndex((el) => el.productsIds.indexOf(id) !== -1)
    const shopBrandId = SHOPS_BRANDS[shopBrandIndex].id;
    const shopIndex = SHOPS.findIndex((el) => el.shopBrandId === shopBrandId)
    return SHOPS[shopIndex];
}

const addProduct = async (value: IProduct) => {
    await timeout(1000);
    PRODUCTS.push(value);
}

const setProduct = async (value: IProduct, id: number) => {
    await timeout(1000);
    const productIndex = PRODUCTS.findIndex((el) => el.id === id)
    PRODUCTS[productIndex] = value;
    return PRODUCTS[productIndex];
}

const deleteProduct = async (id: number) => {
    await timeout(1000);
    const productIndex = PRODUCTS.findIndex((el) => el.id === id)
    PRODUCTS.splice(productIndex, 1)
}