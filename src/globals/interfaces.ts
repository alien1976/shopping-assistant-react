export interface IProduct {
    id: string
    name: string
    price: number
    image: string
    description?: string
    coordinates?: string
    shopBrandId: string
    shopId: string
}

export interface IShop {
    id: string;
    shopBrandId: string;
    name: string;
    address: string;
    map: string;
    mapImage: string
    mapEntryPoint: string
    shopGoogleMapsSrc: string
}

export interface IShopBrand {
    id: string;
    name: string;
    shopsIds: string[];
    productsIds: string[];
    image: any;
    [key: string]: string | string[] | any
}

export interface IUser {
    id?: string
    favoriteShops?: string[]
    favoriteProducts?: string[]
    ownedShopsById?: string[]
    userName: string
    password?: string
    email: string
    firstName: string
    lastName: string
    role: string
}

export interface IMap {
    [key: string]: { coord: string, weight: number }[]
}