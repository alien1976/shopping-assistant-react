import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

interface ICardLoaderProps {
    loaded: boolean
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70%'
        },
    }),
);

const CardLoader = ({ loaded }: ICardLoaderProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {!loaded && <CircularProgress />}
        </div>
    )
}

export default CardLoader;