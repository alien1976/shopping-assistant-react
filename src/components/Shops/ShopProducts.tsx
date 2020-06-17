import * as React from 'react';
import { IProduct } from '../../globals/interfaces';
import ProductCard from '../Products/ProductCard';
import SearchIcon from '@material-ui/icons/Search';
import { InputLabel, TextField, Select, MenuItem, FormControl, Typography, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        filterBar: {
            position: 'sticky',
            top: '60px'
        },
        flexCenter: {
            display: 'flex',
            justifyContent: 'center'
        }
    }),
);

const ShopProducts = ({ allProducts }: { allProducts: IProduct[] }) => {
    const classes = useStyles();
    const searchBarRef = React.useRef(null);
    const [searchByValue, setSearchByValue] = React.useState('newest');
    const [filteredProducts, setFilteredProducts] = React.useState([]);

    React.useEffect(() => {
        filterProducts();
    }, [allProducts, searchByValue])

    const onSearch = () => {
        filterProducts();
    }

    const filterProducts = () => {
        const newProducts = allProducts.filter((el) => el.name.toLowerCase().indexOf(searchBarRef.current.value.toLowerCase()) !== -1);

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

    return (
        <>
            <div className={classes.filterBar + ' filter-bar'}>
                <Grid container>
                    <Grid item xs={12} className={classes.flexCenter}>
                        <Typography variant='h4' color='textPrimary'>Products</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.flexCenter}>
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
                    </Grid>
                </Grid>
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

export default ShopProducts;