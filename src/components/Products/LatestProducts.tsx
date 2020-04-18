import * as React from 'react';
import { useProducts } from '../../services/products.service';
import { IProduct } from '../../globals/interfaces';
import ProductCard from './ProductCard';

const LatestProducts = () => {
    const products = useProducts();
    const [latestProducts, setLatestProducts] = React.useState([]);

    React.useEffect(() => {
        products.getAllProducts().then((products: IProduct[]) => setLatestProducts(products.slice(products.length - 6, products.length - 1)))
    }, [])

    return (
        <div className='products-grid'>
            {latestProducts.map((product) => {
                return (
                    <ProductCard key={product.id} image={product.image} name={product.name} price={product.price} />
                )
            })}
        </div>
    )
}

export default LatestProducts;