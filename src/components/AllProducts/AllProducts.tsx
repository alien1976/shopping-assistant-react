import * as React from 'react';
import { IProduct } from '../../globals/interfaces';
import ProductCard from '../Products/ProductCard';
import SearchIcon from '@material-ui/icons/Search';
import { InputLabel, TextField, Select, MenuItem, FormControl } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { selectShopBrands } from '../../redux/shopBrandsReducer';
import { selectProducts } from '../../redux/productsReducer';

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

const AllProducts = () => {
    const classes = useStyles();
    const searchBarRef = React.useRef(null);
    const products = useSelector(selectProducts);
    const [searchByValue, setSearchByValue] = React.useState('newest');
    const [currentShopBrand, setCurrentShopBrand] = React.useState('all');
    const shopBrands = useSelector(selectShopBrands);
    const [filteredProducts, setFilteredProducts] = React.useState([]);

    React.useEffect(() => {
        if (!products || !products.length) return;

        setFilteredProducts(products)
    }, [products])

    React.useEffect(() => {
        filterProducts();
    }, [searchByValue, currentShopBrand])

    const onSearch = () => {
        filterProducts();
    }

    const filterProducts = () => {
        const shopBrandProducts = currentShopBrand === 'all' ? 'all' : shopBrands.find((el) => el.id === currentShopBrand).productsIds;

        const newProducts = products.filter((el) => {
            return el.name.toLowerCase().indexOf(searchBarRef.current.value.toLowerCase()) !== -1 &&
                (shopBrandProducts === 'all' || shopBrandProducts.indexOf(el.id) !== -1)
        })

        sortProducts(newProducts);
        setFilteredProducts(newProducts);
    }

    const sortProducts = (products: IProduct[]) => {
        switch (searchByValue) {
            case 'low-high': {
                products.sort((a: IProduct, b: IProduct) => {
                    return a.price - b.price
                })
                break;
            }
            case 'high-low': {
                products.sort((a: IProduct, b: IProduct) => {
                    return b.price - a.price
                })
                break;
            }
            case 'newest': break;
            default: break;
        }
    }

    const onSearchByChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchByValue(value);
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
                    <InputLabel id="search-by-label">Search by</InputLabel>
                    <Select
                        labelId="search-by-label"
                        value={searchByValue}
                        onChange={onSearchByChanged}
                        label="Search by"
                    >
                        <MenuItem value={'newest'}>Newest products</MenuItem>
                        <MenuItem value={'low-high'}>Price: Low-High</MenuItem>
                        <MenuItem value={'high-low'}>Price: High-Low</MenuItem>
                    </Select>
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
                        {shopBrands.map((el) => {
                            return <MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>
            <div className='products-grid offset-top'>
                {filteredProducts.map((product) => {
                    return (
                        <ProductCard key={product.id} product={product} />
                    )
                })}
            </div>
        </>
    )
}

export default AllProducts;