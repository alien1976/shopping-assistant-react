import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            marginTop: '10px'
        },
        message: {
            marginTop: '10px'
        }
    }),
);

const ItemLoader = ({ loadingMessage }: { loadingMessage?: string }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress />
            <div className={classes.message}>{loadingMessage}</div>
        </div>
    )
}

export default ItemLoader;