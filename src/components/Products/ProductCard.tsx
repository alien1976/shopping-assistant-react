import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { CARD_WIDTH, CARD_HEIGHT } from '../../globals/constants';
import CardLoader from '../Loaders/CardLoader';

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
        backgroundSize: 'cover'
    },
    content: {
        width: '90%',
        bottom: 0,
        position: 'absolute',
        backgroundColor: 'rgb(0, 0, 0, 0.3)',
        display: 'flex',
        background: 'none'
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
    infoHolder: {
        width: '80%'
    },
    cardActions: {
        width: '25%',
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center'
    },
    iconButton: {
        color: 'white'
    }
});

interface IProductCardProps {
    productImage: string
    productName: string
    productPrice: number
}

const ProductCard = ({ productImage, productName, productPrice }: IProductCardProps) => {
    const classes = useStyles();
    const mediaLoaded = !!productImage && !!productName;

    return (
        <Card className={classes.root}>
            <CardActionArea>
                {!mediaLoaded ?
                    <div className={classes.media}>
                        <CardLoader loaded={mediaLoaded} />
                    </div> :
                    <CardMedia
                        className={classes.media}
                        image={productImage}
                        title={name}
                        component="div"
                    />
                }
            </CardActionArea>
            <CardContent className={classes.content}>
                <div className={classes.infoHolder}>
                    <Typography gutterBottom variant="body1" component='h5' title={name} className={classes.title}>
                        {productName || '...'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.title2}>
                        {productPrice || '...'} lv.
                </Typography>
                </div>
                <CardActions className={classes.cardActions}>
                    <IconButton aria-label="delete" size="small" className={classes.iconButton}>
                        <StarBorderIcon />
                    </IconButton>
                    <IconButton aria-label="add-to-cart" size="small" className={classes.iconButton}>
                        <ShoppingCartOutlinedIcon />
                    </IconButton>
                </CardActions>
            </CardContent>
        </Card >
    )
}

export default React.memo(ProductCard);