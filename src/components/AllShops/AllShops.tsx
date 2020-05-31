import * as React from 'react';
import { IShopBrand, IShop } from '../../globals/interfaces';
import SearchIcon from '@material-ui/icons/Search';
import { InputLabel, TextField, Select, MenuItem, FormControl } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useShopBrands } from '../../services/shopBrands.service';
import { useShops } from '../../services/shops.service';
import ShopCard from '../Shops/ShopCard';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

const AllShops = () => {
    const classes = useStyles();
    const searchBarRef = React.useRef(null);
    const shops = useShops();
    const shopsBrands = useShopBrands();
    const [currentShopBrand, setCurrentShopBrand] = React.useState('all');
    const [allShops, setAllShops] = React.useState([]);
    const [allShopsBrands, setAllShopBrands] = React.useState([]);
    const [filteredShops, setFilteredShops] = React.useState([]);

    React.useEffect(() => {
        shops.getAllShops().then((shops: IShop[]) => {
            setAllShops(shops)
            setFilteredShops(shops)
        })

        shopsBrands.getAllShopBrands().then((shopBrands: IShopBrand[]) => {
            setAllShopBrands(shopBrands)
        })
    }, [])

    React.useEffect(() => {
        filterShops();
    }, [currentShopBrand])

    const onSearch = () => {
        filterShops();
    }

    const filterShops = () => {
        const shopBrandShops = currentShopBrand === 'all' ? 'all' : allShopsBrands.find((el) => el.id === currentShopBrand).shopsIds;

        const newShops = allShops.filter((el) => {
            return el.name.toLowerCase().indexOf(searchBarRef.current.value.toLowerCase()) !== -1 &&
                (shopBrandShops === 'all' || shopBrandShops.indexOf(el.id) !== -1)
        })

        setFilteredShops(newShops);
    }

    const onSearchByShopChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setCurrentShopBrand(value);
    }

    return (
        <>
            <div className='filter-bar'>
                <FormControl variant="outlined" className={classes.formControl}>
                    <TextField inputRef={searchBarRef} onChange={onSearch} id="outlined-search" type="search" variant="outlined" placeholder="Search product"
                        InputProps={{
                            startAdornment: <SearchIcon />
                        }} >
                    </TextField>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="search-by-shop-label">Shop</InputLabel>
                    <Select
                        labelId="search-by-shop-label"
                        value={currentShopBrand}
                        onChange={onSearchByShopChanged}
                        label="Shop"
                    >
                        <MenuItem value={'all'}>All</MenuItem>
                        {allShopsBrands.map((el) => {
                            return <MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>
            <div className='products-grid offset-top'>
                {filteredShops.map((shop: IShop) => {
                    return (
                        <ShopCard key={shop.id} shopBrandId={shop.shopBrandId} address={shop.address} />
                    )
                })}
            </div>
        </>
    )
}

export default AllShops;