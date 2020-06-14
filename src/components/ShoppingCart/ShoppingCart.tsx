import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Badge } from '@material-ui/core';
import { IProduct } from '../../globals/interfaces';
import { useProducts } from '../../services/products.service';
import ItemLoader from '../Loaders/ItemLoader';
import ShopCard from '../Shops/ShopCard';
import { useSelector } from 'react-redux';
import { selectCart } from '../../redux/cartReducer';
import { selectShops } from '../../redux/shopsReducer';

const ShoppingChart = () => {
    const history = useHistory();
    const allShops = useSelector(selectShops);
    const products = useProducts();
    const productsInCartIds = useSelector(selectCart);
    const [shops, setShops] = React.useState([]);
    const [allProducts, setAllProducts] = React.useState([]);

    React.useEffect(() => {
        let productsTemp: IProduct[] = [];

        products.getAllProducts().then((allProducts: IProduct[]) => {
            productsTemp = allProducts.filter((el) => productsInCartIds.indexOf(el.id.toString()) !== -1);
            setAllProducts(productsTemp.map((el) => { return { ...el, bought: false } }));
            setShops(allShops.filter((el) => productsTemp.findIndex((product) => product.shopId === el.id) !== -1))
        })
    }, [productsInCartIds])

    const getShopBrandProductsCount = React.useCallback((shopBrandId: number) => {
        let count = 0;

        for (let product of allProducts) {
            if (product.shopId === shopBrandId) count++;
        }

        return count;
    }, [allProducts]);

    const getShopBrandCartProducts = React.useCallback((shopBrandId: number) => {
        const products = [];

        for (let product of allProducts) {
            if (product.shopId === shopBrandId) products.push(product);
        }

        return products;
    }, [allProducts]);

    const mediaLoaded = !!allProducts && !!shops

    if (!mediaLoaded) {
        return <ItemLoader loadingMessage="Preparing shopping cart. Please wait..." />
    }

    if (!shops.length) {
        return (<div className="content-title">
            <h3>There are no products inside the cart!</h3>
        </div>);
    }

    if (shops.length > 1) {
        return (
            <>
                <div className="content-title">
                    <h3>You've selected a products from different shops. Please select one shop from the list to continue with the shopping!</h3>
                </div>
                <div className='products-grid'>
                    {shops.map((shop) => {
                        return (
                            <Badge key={shop.id} badgeContent={getShopBrandProductsCount(shop.id)} color="primary" anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}>
                                <Link
                                    to={{
                                        pathname: `/shopping-cart/${shop.id}`,
                                        search: '',
                                        state: { products: getShopBrandCartProducts(shop.id), shop: shop }
                                    }}>
                                    <ShopCard key={shop.id} shopId={shop.id} shopBrandId={shop.shopBrandId} address={shop.address} />
                                </Link>
                            </Badge>
                        )
                    })}
                </div>
            </>
        )
    }

    history.push({
        pathname: `/shopping-cart/${shops[0].id}`,
        search: '',
        state: { products: getShopBrandCartProducts(shops[0].id), shop: shops[0] }
    })
    return null;
}

export default React.memo(ShoppingChart);