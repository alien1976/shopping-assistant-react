export interface IProduct {
    id: number
    name: string
    price: number
    image: string
    description?: string
    coordinates: string
}

export interface IShop {
    id: number;
    shopBrandId: number;
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