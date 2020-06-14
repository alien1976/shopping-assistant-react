import * as React from 'react';
import ProductCard from './ProductCard';
import { selectProducts } from '../../redux/productsReducer';
import { useSelector } from 'react-redux';

const LatestProducts = () => {
    const products = useSelector(selectProducts);
    const [latestProducts, setLatestProducts] = React.useState([]);

    React.useEffect(() => {
        if (!products || !products.length) return;
        setLatestProducts(products.slice(Math.max(products.length - 5, 0)))
    }, [products])

    return (
        <>
            <div className="content-title">
                <h2>Latest products added</h2>
            </div>
            <div className='products-grid'>
                {latestProducts.map((product) => {
                    return (
                        <ProductCard key={product.id} product={product} />
                    )
                })}
            </div>
        </>
    )
}

export default LatestProducts;