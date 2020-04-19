import * as React from 'react';
import { IShop } from '../../globals/interfaces';
import ShopCard from './ShopCard';
import { useShops } from '../../services/shops.service';

const PopularShops = () => {
    const shops = useShops();
    const [latestShops, setLatestProducts] = React.useState([]);

    React.useEffect(() => {
        shops.getAllShops().then((shops: IShop[]) => setLatestProducts(shops.slice(Math.max(shops.length - 5, 0))))
    }, [])

    return (
        <>
            <div>
                <h1>Latest shops added:</h1>
            </div>
            <div className='products-grid'>
                {latestShops.map((shop) => {
                    return (
                        <ShopCard key={shop.id} shopBrandId={shop.shopBrandId} address={shop.address} />
                    )
                })}
            </div>
        </>
    )
}

export default PopularShops;