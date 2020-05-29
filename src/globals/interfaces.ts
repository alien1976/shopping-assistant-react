export interface IProduct {
    id: number
    name: string
    price: number
    image: string
    description?: string
    coordinates: string
    shopBrandId: number
    shopId: number
}

export interface IShop {
    id: number;
    shopBrandId: number;
    name: string;
    address: string;
    map: {};
    mapImage: string
}

export interface IShopBrand {
    id: number;
    name: string;
    shopsIds: number[];
    productsIds: number[];
    image: any;
}