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

const useStyles = makeStyles({
    root: {
        width: 300,
        position: 'relative',
        marginBottom: 10,
        borderRadius: 0,
        background: 'none'
    },
    media: {
        position: 'relative',
        height: 300,
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
        width: '20%',
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center'
    },
    iconButton: {
        color: 'white'
    }
});

interface IProductCardProps {
    name: string
    image: string
    price: number
}

const ProductCard = ({ name, image, price }: IProductCardProps) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={image}
                    title={name}
                    component="div"
                />
            </CardActionArea>
            <CardContent className={classes.content}>
                <div className={classes.infoHolder}>
                    <Typography gutterBottom variant="body1" component='h5' title={name} className={classes.title}>
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.title2}>
                        {price} lv.
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

export default ProductCard;