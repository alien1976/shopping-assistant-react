import * as React from 'react';
import { IShop } from '../../globals/interfaces';
import ShopCard from './ShopCard';
import { useShops } from '../../services/shops.service';

const PopularShops = () => {
    const shops = useShops();
    const [latestShops, setLatestShops] = React.useState([]);

    React.useEffect(() => {
        shops.getAllShops().then((shops: IShop[]) => setLatestShops(shops.slice(Math.max(shops.length - 5, 0))))
    }, [])

    return (
        <>
            <div className="content-title">
                <h2>Latest shops added</h2>
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