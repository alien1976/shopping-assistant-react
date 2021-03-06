import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StarIcon from '@material-ui/icons/Star';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuDrawer from './MenuDrawer';
//@ts-ignore
import logo from '../../assets/favicon/favicon-32x32.png';
import { Link, useLocation } from 'react-router-dom';
import { Badge } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartLength } from '../../redux/cartReducer';
import { selectLoggedIn, logoutRequest } from '../../redux/authenticationReducer';
import { selectUserRole, selectUserFavoritesProducts, selectUserCart } from '../../redux/userReducer';

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

const MenuAppBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userCart = useSelector(selectUserCart);
  const cartLength = useSelector(selectCartLength);
  const favoriteProducts = useSelector(selectUserFavoritesProducts);
  const isUserLogged = useSelector(selectLoggedIn);
  const [isDrawerOpened, setIsDrawerOpened] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const userRole = useSelector(selectUserRole)

  const productsInCart = React.useMemo(() => {
    if (isUserLogged) return userCart ? userCart.length : 0;

    return cartLength;
  }, [isUserLogged, userCart, cartLength])

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setIsDrawerOpened(prev => !prev)
  };

  const onSignOut = () => {
    dispatch(logoutRequest())
    setAnchorEl(null)
  };

  const location = useLocation()

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
          {isUserLogged &&
            <IconButton color="inherit">
              <Link to='/user-favorite-products'>
                <Badge badgeContent={favoriteProducts && favoriteProducts.length} color="primary">
                  <StarIcon />
                </Badge>
              </Link>
            </IconButton>}
          <IconButton color="inherit">
            <Link to='/shopping-cart'>
              <Badge badgeContent={productsInCart} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </Link>
          </IconButton>
          {isUserLogged ? (
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
                <Link to='/user-profile'>
                  <MenuItem onClick={handleClose}>
                    Profile
                  </MenuItem>
                </Link>
                {userRole === 'Admin' ?
                  <div>
                    <Link to='/users-manager'>
                      <MenuItem onClick={handleClose}>
                        Users manager
                      </MenuItem>
                    </Link>
                    <Link to='/shop-brands-manager'>
                      <MenuItem onClick={handleClose}>
                        Shop brands manager
                      </MenuItem>
                    </Link>
                    <Link to='/shops-manager'>
                      <MenuItem onClick={handleClose}>
                        Shops manager
                      </MenuItem>
                    </Link>
                    <Link to='/products-manager'>
                      <MenuItem onClick={handleClose}>
                        Products manager
                      </MenuItem>
                    </Link>
                  </div>
                  : null}
                {userRole === 'Shop Owner' ?
                  <div>
                    <Link to='/shop-brands-manager'>
                      <MenuItem onClick={handleClose}>
                        Shop brands manager
                      </MenuItem>
                    </Link>
                    <Link to='/shops-manager'>
                      <MenuItem onClick={handleClose}>
                        Shops manager
                      </MenuItem>
                    </Link>
                    <Link to='/products-manager'>
                      <MenuItem onClick={handleClose}>
                        Products manager
                      </MenuItem>
                    </Link>
                  </div>
                  : null}
                {userRole === 'Shop Manager' ?
                  <div>
                    <Link to='/shops-manager'>
                      <MenuItem onClick={handleClose}>
                        Shops manager
                      </MenuItem>
                    </Link>
                    <Link to='/products-manager'>
                      <MenuItem onClick={handleClose}>
                        Products manager
                      </MenuItem>
                    </Link>
                  </div>
                  : null}
                <MenuItem onClick={onSignOut}>Sign out</MenuItem>
              </Menu>
            </div>
          ) : <div>
              <IconButton
                onClick={handleMenu}
              >
                <LockOpenIcon />
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
                <Link to={{
                  pathname: `/login`,
                  search: '',
                  state: { from: { pathname: '/#' + location.pathname } }
                }}>
                  <MenuItem onClick={handleClose}>
                    Login
                  </MenuItem>
                </Link>
                <MenuItem onClick={handleClose}>
                  <Link to='/sign-up'>
                    Register
                  </Link>
                </MenuItem>
              </Menu>
            </div>}
        </Toolbar>
        <MenuDrawer isOpened={isDrawerOpened} toggleDrawer={toggleDrawer}></MenuDrawer>
      </AppBar>
    </div>
  );
}

export default MenuAppBar;