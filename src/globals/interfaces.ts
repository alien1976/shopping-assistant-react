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
    mapEntryPoint: string
    shopGoogleMapsSrc: string
}

export interface IShopBrand {
    id: number;
    name: string;
    shopsIds: number[];
    productsIds: number[];
    image: any;
}

export interface IUser {
    id?: string
    favoriteShops?: string[]
    favoriteProducts?: string[]
    ownedShopsById?: string[]
    userName: string
    password: string
    email: string
    firstName: string
    lastName: string
    role: string
}