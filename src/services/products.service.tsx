import { SA_API_BASE } from "../globals/constants";
import { handleResponse, authHeader } from "../utils/utils";
import { IProduct } from "../globals/interfaces";

const getAllProducts = async () => {
    const requestOptions = {
        method: 'GET'
    };

    const response = fetch(`${SA_API_BASE}/products`, requestOptions);
    return await handleResponse(response);
}

const getProductById = async (id: string) => {
    const requestOptions = {
        method: 'GET'
    };

    const response = fetch(`${SA_API_BASE}/products/${id}`, requestOptions)
    return await handleResponse(response);
}

const addProduct = async (product: IProduct) => {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    };

    const response = fetch(`${SA_API_BASE}/products`, requestOptions)
    return await handleResponse(response);
}

const updateProduct = async (product: IProduct) => {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    };

    const response = fetch(`${SA_API_BASE}/products/${product.id}`, requestOptions)
    return await handleResponse(response);
}

const deleteProduct = async (shopBrandId: string) => {
    const requestOptions = {
        method: 'DELETE',
        header: authHeader()
    };

    const response = fetch(`${SA_API_BASE}/products/${shopBrandId}`, requestOptions)
    return await handleResponse(response);
}

export const productsService = {
    getAllProducts: getAllProducts,
    getProductById: getProductById,
    addProduct: addProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
};
