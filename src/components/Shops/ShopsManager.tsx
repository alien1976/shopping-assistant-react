import * as React from 'react';
import MaterialTable, { Column } from 'material-table';
import { shopsService } from '../../services/shops.service';
import { useDispatch, useSelector } from 'react-redux';
import { openSnackBar } from '../../redux/snackBarReducer';
import { IShop, IShopBrand } from '../../globals/interfaces';
import { selectShopBrands } from '../../redux/shopBrandsReducer';
import MapIcon from '@material-ui/icons/Map';
import { Link } from 'react-router-dom';

interface TableState {
    columns: Array<Column<IShop>>;
    data: IShop[];
}

const ShopsManager = () => {
    const shopBrands = useSelector(selectShopBrands);

    const shopBrandsOptions = React.useMemo(() => {
        if (!shopBrands || !shopBrands.length) return {};
        const options: { [key: string]: string } = {};

        shopBrands.forEach((el: IShopBrand) => {
            options[el.id] = el.name;
        })

        return options;
    }, [shopBrands]);

    const dispatch = useDispatch()
    const [state, setState] = React.useState<TableState>({
        columns: [
            { title: 'Shop name', field: 'name' },
            { title: 'Shop address', field: 'address' },
            { title: 'Shop brand', field: 'shopBrandId', lookup: shopBrandsOptions },
            {
                title: 'Мap', field: 'map', render: (rowData) => {
                    return (
                        <Link to={`/shop-map-editor/${rowData.id}`}>
                            <MapIcon></MapIcon>
                        </Link>
                    )
                },
                editComponent: (item) => {
                    return null;
                }
            },
            { title: 'Map image', field: 'mapImage' },
        ],
        data: []
    });

    const setShops = async () => {
        try {
            const shops = await shopsService.getAllShops();
            setState((prevState) => {
                const data = [...shops];
                return { ...prevState, data };
            });
        } catch (error) {
            dispatch(openSnackBar({ message: `Unable to fetch shops: ${error.message}`, status: 'error' }))
        }
    }

    React.useEffect(() => {
        setShops();
    }, [])

    const onAddShop = async (shop: IShop) => {
        try {
            await shopsService.addShop(shop);
            dispatch(openSnackBar({ message: `Successfully added ${shop.name}`, status: 'success' }))
        } catch (error) {
            dispatch(openSnackBar({ message: `Error: ${error.message}`, status: 'error' }))
        }

        setShops();
    }

    const onRemoveShop = async (shop: IShop) => {
        try {
            await shopsService.deleteShop(shop.id.toString());
            dispatch(openSnackBar({ message: `Successfully removed ${shop.name}`, status: 'success' }))
        } catch (error) {
            dispatch(openSnackBar({ message: `Error: ${error.message}`, status: 'error' }))
        }

        setShops();
    }

    const onUpdateShop = async (shop: IShop) => {
        try {
            await shopsService.updateShop(shop);
            dispatch(openSnackBar({ message: `Successfully updated ${shop.name}`, status: 'success' }))
        } catch (error) {
            dispatch(openSnackBar({ message: `Error: ${error.message}`, status: 'error' }))
        }

        setShops();
    }

    return (
        <MaterialTable
            title="Shops manager"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: onAddShop,
                onRowUpdate: onUpdateShop,
                onRowDelete: onRemoveShop,
            }}
        />
    );
}

export default ShopsManager;