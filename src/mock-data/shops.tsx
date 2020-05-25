//@ts-ignore
import ballaImageUrl from '../assets/images/balla.png';
//@ts-ignore
import KaauflandImageUrl from '../assets/images/kaaufland.png';
//@ts-ignore
import ShopMap from '../assets/images/shopMap.svg';
import { IProduct, IShop } from '../globals/interfaces';

export const SHOPS: IShop[] = [
    { id: 1, shopBrandId: 1, address: 'Bulgaria, Sofia, Bulgaria avenue 55', map: {}, mapImage: ShopMap },
    { id: 2, shopBrandId: 1, address: 'Bulgaria, Sofia, Bulgaria avenue 69', map: {}, mapImage: ShopMap },
    { id: 3, shopBrandId: 2, address: 'Bulgaria, Sofia, Mladost 3', map: {}, mapImage: ShopMap },
    { id: 4, shopBrandId: 2, address: 'Bulgaria, Sofia, Lulin 10', map: {}, mapImage: ShopMap },
]

export const PRODUCTS: IProduct[] = [
    { id: 1, name: 'Balla Bread White', coordinates: '21,34', price: 0.89, image: 'https://i0.wp.com/gatherforbread.com/wp-content/uploads/2015/08/Easiest-Yeast-Bread.jpg?fit=800%2C1157&ssl=1' },
    { id: 2, name: 'Balla Bread Brown', coordinates: '253,54', price: 0.89, image: 'https://i0.wp.com/gatherforbread.com/wp-content/uploads/2015/08/Easiest-Yeast-Bread.jpg?fit=800%2C1157&ssl=1' },
    { id: 3, name: 'Balla Milk', coordinates: '266,354', description: 'This product is with very high quality. Made from happy cows.', price: 1.50, image: 'https://33q47o1cmnk34cvwth15pbvt120l-wpengine.netdna-ssl.com/wp-content/uploads/raw-milk-1-e1563894986431-755x1024.jpg' },
    { id: 4, name: 'Balla Milk', coordinates: '26,234', description: 'This product is with very high quality. Made from happy cows.', price: 1.50, image: 'https://33q47o1cmnk34cvwth15pbvt120l-wpengine.netdna-ssl.com/wp-content/uploads/raw-milk-1-e1563894986431-755x1024.jpg' },
    { id: 5, name: 'Clever Water', coordinates: '223,344', price: 0.30, image: 'https://www.brecorder.com/wp-content/uploads/2018/07/water-3.jpg' },
    { id: 6, name: 'Kaafland Bread', coordinates: '231,74', price: 0.68, image: 'https://i0.wp.com/gatherforbread.com/wp-content/uploads/2015/08/Easiest-Yeast-Bread.jpg?fit=800%2C1157&ssl=1' },
    { id: 7, name: 'Kaafland Bread', coordinates: '41,64', price: 0.68, image: 'https://i0.wp.com/gatherforbread.com/wp-content/uploads/2015/08/Easiest-Yeast-Bread.jpg?fit=800%2C1157&ssl=1' },
]
export const SHOPS_BRANDS = [
    { id: 1, name: 'Balla', shopsIds: [1, 2], productsIds: [1, 2, 3, 4, 5], image: ballaImageUrl },
    { id: 2, name: 'Kaaufland', shopsIds: [3, 4], productsIds: [6, 7], image: KaauflandImageUrl }
]