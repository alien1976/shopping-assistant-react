import * as React from 'react';
import ShopCard from './ShopCard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectShops } from '../../redux/shopsReducer';

const PopularShops = () => {
    const shops = useSelector(selectShops);
    const [latestShops, setLatestShops] = React.useState([]);

    React.useEffect(() => {
        setLatestShops(shops.slice(Math.max(shops.length - 5, 0)));
    }, [shops])

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