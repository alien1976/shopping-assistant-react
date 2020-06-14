import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { IShopBrand } from '../../globals/interfaces';
import { CARD_WIDTH, CARD_HEIGHT } from '../../globals/constants';
import CardLoader from '../Loaders/CardLoader';
import { selectShops } from '../../redux/shopsReducer';
import { selectShopBrands } from '../../redux/shopBrandsReducer';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
    root: {
        width: CARD_WIDTH,
        position: 'relative',
        marginBottom: 10,
        borderRadius: 0,
        background: 'none'
    },
    media: {
        position: 'relative',
        height: CARD_HEIGHT,
        backgroundSize: 'contain'
    },
    content: {
        width: '90%',
        bottom: 0,
        position: 'absolute',
        backgroundColor: 'rgb(0, 0, 0, 0.3)',
        display: 'flex',
        flexFlow: 'column',
    },
    title: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: 'white'
    },
    title2: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: '#dedede'
    },
});

interface IProductCardProps {
    shopBrandId: number
    shopId: number
    address: string
}

const ShopCard = ({ shopBrandId, shopId, address }: IProductCardProps) => {
    const shopBrands = useSelector(selectShopBrands);
    const classes = useStyles();
    const [shopImage, setShopImage] = React.useState('');
    const [shopName, setShopName] = React.useState('');

    React.useEffect(() => {
        if (!shopBrands || !shopBrands.length) return;
        const shopBrand = shopBrands.find((el) => el.id === shopBrandId)
        setShopImage(shopBrand.image);
        setShopName(shopBrand.name);
    }, [shopBrands])

    const mediaLoaded = !!shopImage && !!shopName;

    return (
        <Card className={classes.root}>
            <CardActionArea>
                {!mediaLoaded ?
                    <div className={classes.media}>
                        <CardLoader loaded={mediaLoaded} />
                    </div> :
                    <CardMedia
                        className={classes.media}
                        image={shopImage}
                        title={name}
                        component="div"
                    />}
            </CardActionArea>
            <CardContent className={classes.content}>
                <Typography gutterBottom variant="body1" component='h5' title={shopName} className={classes.title}>
                    {shopName || '...'}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" title={address} className={classes.title2}>
                    Address: {address || '...'}
                </Typography>
            </CardContent>
        </Card >
    )
}

export default ShopCard;