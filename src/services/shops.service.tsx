import { SA_API_BASE } from "../globals/constants";
import { handleResponse, authHeader } from "../utils/utils";
import { IShop } from "../globals/interfaces";

const getAllShops = async () => {
    const requestOptions = {
        method: 'GET'
    };

    const response = fetch(`${SA_API_BASE}/shops`, requestOptions);
    return await handleResponse(response);
}

const getShopById = async (id: string) => {
    const requestOptions = {
        method: 'GET'
    };

    const response = fetch(`${SA_API_BASE}/shops/${id}`, requestOptions)
    return await handleResponse(response);
}

const addShop = async (shopBrand: IShop) => {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(shopBrand)
    };

    const response = fetch(`${SA_API_BASE}/shops`, requestOptions)
    return await handleResponse(response);
}

const updateShop = async (shopBrand: IShop) => {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(shopBrand)
    };

    const response = fetch(`${SA_API_BASE}/shops/${shopBrand.id}`, requestOptions)
    return await handleResponse(response);
}

const deleteShop = async (shopBrandId: string) => {
    const requestOptions = {
        method: 'DELETE',
        header: authHeader()
    };

    const response = fetch(`${SA_API_BASE}/shops/${shopBrandId}`, requestOptions)
    return await handleResponse(response);
}

export const shopsService = {
    getAllShops: getAllShops,
    getShopById: getShopById,
    addShop: addShop,
    updateShop: updateShop,
    deleteShop: deleteShop,
};
