import * as React from 'react';
import { IProduct } from '../../globals/interfaces';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        width: 300,
        margin: '0 auto',
        marginBottom: 10
    },
    media: {
        height: 150,
    },
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
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {price} lv.
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Add to chart
                </Button>
                <Button size="small" color="primary">
                    Add to favorites
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard;