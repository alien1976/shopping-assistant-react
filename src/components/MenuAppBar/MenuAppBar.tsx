import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuDrawer from './MenuDrawer';
//@ts-ignore
import logo from '../../assets/favicon/favicon-32x32.png';
import { Link } from 'react-router-dom';
import { Badge } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartLength } from '../../redux/cartReducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position: 'fixed',
      zIndex: 99,
      width: '100%',
    },
    appBar: {
      background: 'rgba(0,0,0,0.7)',
      height: 60,
      borderBottom: '1px solid #595959'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function MenuAppBar() {
  const classes = useStyles();
  const productsInCart = useSelector(selectCartLength);
  const [auth, setAuth] = React.useState(true);
  const [isDrawerOpened, setIsDrawerOpened] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setIsDrawerOpened(prev => !prev)
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick={toggleDrawer} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <IconButton edge="start" className={classes.menuButton} aria-label="home">
              <img src={logo} />
            </IconButton>
          </Link>
          <Typography variant="h5" className={classes.title}>
          </Typography>
          <IconButton color="inherit">
            <Link to='/shopping-cart'>
              <Badge badgeContent={productsInCart} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </Link>
          </IconButton>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
        <MenuDrawer isOpened={isDrawerOpened} toggleDrawer={toggleDrawer}></MenuDrawer>
      </AppBar>
    </div>
  );
}