import * as React from 'react';
import MaterialTable, { Column } from 'material-table';
import { shopBrandsService } from '../../services/shopBrands.service';
import { useDispatch } from 'react-redux';
import { openSnackBar } from '../../redux/snackBarReducer';
import { IShopBrand } from '../../globals/interfaces';

interface TableState {
    columns: Array<Column<IShopBrand>>;
    data: IShopBrand[];
}

const ShopBrandsManager = () => {
    const dispatch = useDispatch()
    const [state, setState] = React.useState<TableState>({
        columns: [
            { title: 'Shop brand name', field: 'name' },
            { title: 'Image', field: 'image' },
        ],
        data: []
    });

    const setShopBrands = async () => {
        try {
            const shopBrands = await shopBrandsService.getAllShopBrands();
            setState((prevState) => {
                const data = [...shopBrands];
                return { ...prevState, data };
            });
        } catch (error) {
            dispatch(openSnackBar({ message: `Unable to fetch shopBrands: ${error.message}`, status: 'error' }))
        }
    }

    React.useEffect(() => {
        setShopBrands();
    }, [])

    const onAddShopBrand = async (shopBrand: IShopBrand) => {
        try {
            await shopBrandsService.addShopBrand(shopBrand);
            dispatch(openSnackBar({ message: `Successfully added ${shopBrand.name}`, status: 'success' }))
        } catch (error) {
            dispatch(openSnackBar({ message: `Error: ${error.message}`, status: 'error' }))
        }

        setShopBrands();
    }

    const onRemoveShopBrand = async (shopBrand: IShopBrand) => {
        try {
            await shopBrandsService.deleteShopBrand(shopBrand.id.toString());
            dispatch(openSnackBar({ message: `Successfully removed ${shopBrand.name}`, status: 'success' }))
        } catch (error) {
            dispatch(openSnackBar({ message: `Error: ${error.message}`, status: 'error' }))
        }

        setShopBrands();
    }

    const onUpdateShopBrand = async (shopBrand: IShopBrand) => {
        try {
            await shopBrandsService.updateShopBrand(shopBrand);
            dispatch(openSnackBar({ message: `Successfully updated ${shopBrand.name}`, status: 'success' }))
        } catch (error) {
            dispatch(openSnackBar({ message: `Error: ${error.message}`, status: 'error' }))
        }

        setShopBrands();
    }

    return (
        <MaterialTable
            title="Shop brands manager"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: onAddShopBrand,
                onRowUpdate: onUpdateShopBrand,
                onRowDelete: onRemoveShopBrand,
            }}
        />
    );
}

export default ShopBrandsManager;