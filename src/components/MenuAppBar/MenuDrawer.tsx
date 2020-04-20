import * as React from 'react';
import { Drawer, List, ListItem, ListItemText, makeStyles, createStyles, Theme } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import StorefrontIcon from '@material-ui/icons/Storefront';

interface IMenuDrawerProps {
    isOpened: boolean
    toggleDrawer: () => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 200,
            background: 'black'
        },
        button: {
            textAlign: 'left',
            marginLeft: 5,
            marginBottom: 0
        },
        list: {
            textAlign: 'left',
            padding: 0
        },
        presentation: {
            marginTop: 10
        }
    }),
);

const MenuDrawer = ({ isOpened, toggleDrawer }: IMenuDrawerProps) => {
    const classes = useStyles();

    return (
        <Drawer PaperProps={{ className: classes.root }} anchor='left' open={isOpened} onClose={toggleDrawer}>
            <div
                className={classes.presentation}
                role="presentation"
                onClick={toggleDrawer}
                onKeyDown={toggleDrawer}
            >
                <List className={classes.list}>
                    <NavLink activeClassName="active-link" exact to="/">
                        <ListItem button>
                            <HomeIcon></HomeIcon>
                            <ListItemText className={classes.button} primary="Home" />
                        </ListItem>
                    </NavLink>
                    <NavLink activeClassName="active-link" to="/products">
                        <ListItem button>
                            <LocalMallIcon></LocalMallIcon>
                            <ListItemText className={classes.button} primary="All products" />
                        </ListItem>
                    </NavLink>
                    <NavLink activeClassName="active-link" to="/shop-brands">
                        <ListItem button>
                            <StorefrontIcon></StorefrontIcon>
                            <ListItemText className={classes.button} primary="Shop brands" />
                        </ListItem>
                    </NavLink>
                </List>
            </div>
        </Drawer>
    );
}

export default React.memo(MenuDrawer);