import * as React from 'react';
import MaterialTable, { Column } from 'material-table';
import { productsService } from '../../services/products.service';
import { useDispatch, useSelector } from 'react-redux';
import { openSnackBar } from '../../redux/snackBarReducer';
import { IProduct, IShopBrand, IShop } from '../../globals/interfaces';
import { selectShopBrands } from '../../redux/shopBrandsReducer';
import { selectShops } from '../../redux/shopsReducer';
import { Select, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@material-ui/icons/LocationOn';

interface TableState {
    columns: Array<Column<IProduct>>;
    data: IProduct[];
}

const ProductsManager = () => {
    const shopBrands = useSelector(selectShopBrands);
    const shops = useSelector(selectShops);

    const shopBrandsOptions = React.useMemo(() => {
        if (!shopBrands || !shopBrands.length) return {};
        const options: { [key: string]: string } = {};

        shopBrands.forEach((el: IShopBrand) => {
            options[el.id] = el.name;
        })

        return options;
    }, [shopBrands]);

    const shopOptions = React.useMemo(() => {
        const options: { [key: string]: string } = {};

        shops.forEach((shop: IShop) => {
            options[shop.id] = shop.name + ' ' + shop.address;
        })

        return options;
    }, [shops])

    const dispatch = useDispatch()
    const [state, setState] = React.useState<TableState>({
        columns: [
            { title: 'Product name', field: 'name' },
            { title: 'Product price', field: 'price' },
            { title: 'Shop brand', field: 'shopBrandId', lookup: shopBrandsOptions },
            {
                title: 'Shop', field: 'shopId', lookup: shopOptions, editComponent: (props) => {
                    const options: { [key: string]: string } = {};

                    shops.forEach((shop: IShop) => {
                        if (shop.shopBrandId === props.rowData.shopBrandId) options[shop.id] = shop.name + ' ' + shop.address;
                    })

                    if (!Object.keys(options).length && props.value !== '') props.onChange('');

                    return (
                        <Select
                            value={props.value || ''}
                            onChange={e => {
                                props.onChange(e.target.value);
                            }}
                        >
                            {Object.keys(options).map((el, index) => {
                                return <MenuItem key={el} value={el}>{options[el]}</MenuItem>
                            })}
                        </Select>
                    )
                }
            },
            {
                title: 'Image', field: 'image', render: rowData => <div style={{ width: 50, height: 50, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: `url(${rowData.image})`, borderRadius: '50%' }}></div>
            },
            {
                title: 'Product location', field: 'coordinates', render: (rowData) => {
                    return (
                        <Link to={`/product-map-editor/${rowData.id}`}>
                            <LocationOnIcon></LocationOnIcon>
                        </Link>
                    )
                },
                editComponent: (item) => {
                    return null;
                }
            },
        ],
        data: []
    });

    const setProducts = async () => {
        try {
            const products = await productsService.getAllProducts();
            setState((prevState) => {
                const data = [...products];
                return { ...prevState, data };
            });
        } catch (error) {
            dispatch(openSnackBar({ message: `Unable to fetch products: ${error.message}`, status: 'error' }))
        }
    }

    React.useEffect(() => {
        setProducts();
    }, [])

    const onAddProduct = async (product: IProduct) => {
        try {
            await productsService.addProduct(product);
            dispatch(openSnackBar({ message: `Successfully added ${product.name}`, status: 'success' }))
        } catch (error) {
            dispatch(openSnackBar({ message: `Error: ${error.message}`, status: 'error' }))
        }

        setProducts();
    }

    const onRemoveProduct = async (product: IProduct) => {
        try {
            await productsService.deleteProduct(product.id.toString());
            dispatch(openSnackBar({ message: `Successfully removed ${product.name}`, status: 'success' }))
        } catch (error) {
            dispatch(openSnackBar({ message: `Error: ${error.message}`, status: 'error' }))
        }

        setProducts();
    }

    const onUpdateProduct = async (product: IProduct) => {
        try {
            await productsService.updateProduct(product);
            dispatch(openSnackBar({ message: `Successfully updated ${product.name}`, status: 'success' }))
        } catch (error) {
            dispatch(openSnackBar({ message: `Error: ${error.message}`, status: 'error' }))
        }

        setProducts();
    }

    return (
        <MaterialTable
            title="Shops manager"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: onAddProduct,
                onRowUpdate: onUpdateProduct,
                onRowDelete: onRemoveProduct,
            }}
        />
    );
}

export default ProductsManager;