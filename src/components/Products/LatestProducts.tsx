import * as React from 'react';
import { useProducts } from '../../services/products.service';
import { IProduct } from '../../globals/interfaces';
import ProductCard from './ProductCard';

const LatestProducts = () => {
    const products = useProducts();
    const [latestProducts, setLatestProducts] = React.useState([]);

    React.useEffect(() => {
        products.getAllProducts().then((products: IProduct[]) => setLatestProducts(products.slice(Math.max(products.length - 5, 0))))
    }, [])

    return (
        <>
            <div className="content-title">
                <h2>Latest products added</h2>
            </div>
            <div className='products-grid'>
                {latestProducts.map((product) => {
                    return (
                        <ProductCard key={product.id} productName={product.name} productImage={product.image} productPrice={product.price} />
                    )
                })}
            </div>
        </>
    )
}

export default LatestProducts;