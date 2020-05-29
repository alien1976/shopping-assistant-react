import { timeout } from "../utils/utils";
import { SHOPS, SHOPS_BRANDS } from "../mock-data/shops";
import { IShop } from "../globals/interfaces";

import * as React from 'react';

const { createContext, useContext } = React;

const ShopsContext = createContext(null);

export const ShopsProvider = (props: { children: React.ReactNode }) => {
    const value = {
        getAllShops: getAllShops,
        getShop: getShop,
        addShop: addShop,
        setShop: setShop,
        deleteShop: deleteShop,
        getShopBrand: getShopBrand
    };

    return (
        <ShopsContext.Provider value={value} >
            {props.children}
        </ShopsContext.Provider>
    )
};

export const useShops = () => {
    return useContext(ShopsContext);
};

const getAllShops = async () => {
    return SHOPS;
}

const getShop = async (id: number) => {
    // await timeout(1000);
    const productIndex = SHOPS.findIndex((el) => el.id === id)
    return SHOPS[productIndex];
}

const addShop = async (value: IShop) => {
    await timeout(1000);
    SHOPS.push(value);
}

const setShop = async (value: IShop, id: number) => {
    await timeout(1000);
    const productIndex = SHOPS.findIndex((el) => el.id === id)
    SHOPS[productIndex] = value;
    return SHOPS[productIndex];
}

const deleteShop = async (id: number) => {
    await timeout(1000);
    const productIndex = SHOPS.findIndex((el) => el.id === id)
    SHOPS.splice(productIndex, 1)
}

const getShopBrand = async (id: number) => {
    // await timeout(1000);
    const shopBrandIndex = SHOPS_BRANDS.findIndex((el) => el.id === id);
    return SHOPS_BRANDS[shopBrandIndex];
}