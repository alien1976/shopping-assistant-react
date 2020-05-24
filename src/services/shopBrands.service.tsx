import { timeout } from "../utils/utils";
import { SHOPS_BRANDS } from "../mock-data/shops";
import { IShopBrand } from "../globals/interfaces";

import * as React from 'react';

const { createContext, useContext } = React;

const ShopBrandsContext = createContext(null);

export const ShopBrandsProvider = (props: { children: React.ReactNode }) => {
    const value = {
        getAllShopBrands: getAllShopBrands,
        addShopBrand: addShopBrand,
        setShopBrand: setShopBrand,
        deleteShopBrand: deleteShopBrand,
        getShopBrand: getShopBrand
    };

    return (
        <ShopBrandsContext.Provider value={value} >
            {props.children}
        </ShopBrandsContext.Provider>
    )
};

export const useShopBrands = () => {
    return useContext(ShopBrandsContext);
};

const getAllShopBrands = async () => {
    return SHOPS_BRANDS;
}

const getShopBrand = async (id: number) => {
    await timeout(1000);
    const shopBrandIndex = SHOPS_BRANDS.findIndex((el) => el.id === id)
    return SHOPS_BRANDS[shopBrandIndex];
}

const addShopBrand = async (value: IShopBrand) => {
    await timeout(1000);
    SHOPS_BRANDS.push(value);
}

const setShopBrand = async (value: IShopBrand, id: number) => {
    await timeout(1000);
    const shopBrandIndex = SHOPS_BRANDS.findIndex((el) => el.id === id)
    SHOPS_BRANDS[shopBrandIndex] = value;
    return SHOPS_BRANDS[shopBrandIndex];
}

const deleteShopBrand = async (id: number) => {
    await timeout(1000);
    const shopBrandIndex = SHOPS_BRANDS.findIndex((el) => el.id === id)
    SHOPS_BRANDS.splice(shopBrandIndex, 1)
}