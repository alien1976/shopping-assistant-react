import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useShops } from '../../services/shops.service';
import { IShopBrand } from '../../globals/interfaces';

const useStyles = makeStyles({
    root: {
        width: 300,
        position: 'relative',
        margin: '0 auto',
        marginBottom: 10
    },
    media: {
        position: 'relative',
        height: 230,
        backgroundSize: 'cover'
    },
    content: {
        width: '90%',
        bottom: 0,
        position: 'absolute',
        backgroundColor: 'rgb(250, 250, 250, 0.7)',
        display: 'flex',
        flexFlow: 'column'

    },
    title: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    }
});

interface IProductCardProps {
    shopBrandId: number
    address: number
}

const ShopCard = ({ shopBrandId, address }: IProductCardProps) => {
    const shops = useShops();
    const classes = useStyles();
    const [shopImage, setShopImage] = React.useState('');
    const [shopName, setShopName] = React.useState('');

    React.useEffect(() => {
        shops.getShopBrand(shopBrandId).then((shopBrand: IShopBrand) => {
            console.log(shopBrand)
            setShopImage(shopBrand.image);
            setShopName(shopBrand.name);
        })
    }, [])

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={shopImage}
                    title={shopName}
                    component="div"
                />
            </CardActionArea>
            <CardContent className={classes.content}>
                <Typography gutterBottom variant="body1" component='h5' title={shopName} className={classes.title}>
                    {shopName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Address: {address}
                </Typography>
            </CardContent>
        </Card >
    )
}

export default ShopCard;