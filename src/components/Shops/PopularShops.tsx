import * as React from 'react';
import { IShop } from '../../globals/interfaces';
import ShopCard from './ShopCard';
import { useShops } from '../../services/shops.service';
import { Link } from 'react-router-dom';

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
                        <Link key={shop.id} to={`/shops/${shop.id}`}>
                            <ShopCard shopId={shop.id} shopBrandId={shop.shopBrandId} address={shop.address} />
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

export default PopularShops;