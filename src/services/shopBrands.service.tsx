import { SA_API_BASE } from "../globals/constants";
import { handleResponse, authHeader } from "../utils/utils";
import { IShopBrand } from "../globals/interfaces";

const getAllShopBrands = async () => {
    const requestOptions = {
        method: 'GET'
    };

    const response = fetch(`${SA_API_BASE}/shop-brands`, requestOptions);
    return await handleResponse(response);
}

const getShopBrandById = async (id: string) => {
    const requestOptions = {
        method: 'GET'
    };

    const response = fetch(`${SA_API_BASE}/shop-brands/${id}`, requestOptions)
    return await handleResponse(response);
}

const addShopBrand = async (shopBrand: IShopBrand) => {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(shopBrand)
    };

    const response = fetch(`${SA_API_BASE}/shop-brands`, requestOptions)
    return await handleResponse(response);
}

const updateShopBrand = async (shopBrand: IShopBrand) => {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(shopBrand)
    };

    const response = fetch(`${SA_API_BASE}/shop-brands/${shopBrand.id}`, requestOptions)
    return await handleResponse(response);
}

const deleteShopBrand = async (shopBrandId: string) => {
    const requestOptions = {
        method: 'DELETE',
        header: authHeader()
    };

    const response = fetch(`${SA_API_BASE}/shop-brands/${shopBrandId}`, requestOptions)
    return await handleResponse(response);
}

export const shopBrandsService = {
    getAllShopBrands: getAllShopBrands,
    getShopBrandById: getShopBrandById,
    addShopBrand: addShopBrand,
    updateShopBrand: updateShopBrand,
    deleteShopBrand: deleteShopBrand,
};
