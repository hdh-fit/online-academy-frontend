import React from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
//import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Popover from '../Popover';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import FormDialog from '../FormDialog';
import SignUpForm from '../SignUpForm';
import { getCaterogies, signIn, signUp } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { onLoginSuccess, onLogOutSuccess } from '../../core/store/reducer/app/actions';
import { showErrorToast, showSuccessAlert } from '../../core/utils';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isOpenLogin, setIsOpenLogin] = React.useState(false);
  const [isOpenSignUp, setIsSignUp] = React.useState(false);
  const dispatch = useDispatch();
  const appState = useSelector(state => state.app);
  const [categories, setCategories] = React.useState([]);
  const [searchKeyword, setSearchKeyword] = React.useState(false);

  const onSeachKeyChange = (text) => {
    setSearchKeyword(text);
  };

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      history.push(`/search?course=${searchKeyword}`);
    }
  };

  React.useEffect(() => {
    getCaterogies().then(res => {
      if (res.success) {
        setCategories(res.categories);
      }
    });
  }, []);

  const onClickLogin = () => {
    setIsOpenLogin(true);
    setIsSignUp(false);
  };

  const onClickSignUp = () => {
    setIsSignUp(true);
    setIsOpenLogin(false);
  };

  const closeModal = () => {
    setIsOpenLogin(false);
    setIsSignUp(false);
  };


  const history = useHistory();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const onLogOut = () => {
    dispatch(onLogOutSuccess());
    handleMenuClose();
    history.push("/");
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const onSignUp = (data) => {
    signUp(data)
      .then(rs => {
        if (rs.success) {
          closeModal();
          showSuccessAlert('Sign up successfully.');
        } else {
          showErrorToast("Some thing wrong.");
        }
      })
      .catch(error => {
        showErrorToast("Some thing wrong.");
        console.log(error);
      });
  };

  const onSignIn = (signInReq) => {
    signIn(signInReq)
      .then(response => {
        if (response.success) {
          dispatch(onLoginSuccess(response.data.accessToken));
          setIsOpenLogin(false);
        } else {
          showErrorToast("Invalid username or password.");
        }
      })
      .catch(error => {
        console.log(error);
        showErrorToast("Some thing wrong.");
      });
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => history.push("/myprofile")}>Profile</MenuItem>
      <MenuItem onClick={onLogOut}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar color={'default'} position="relative">
        <FormDialog
          onSignIn={onSignIn}
          onClose={closeModal}
          isOpen={isOpenLogin} />
        <SignUpForm
          onSignUp={onSignUp}
          isOpen={isOpenSignUp}
          onClose={closeModal}
        />
        <Toolbar>
          {/*<IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>*/}
          <Button onClick={() => history.push("/")} className={classes.title}>
            Fitstudy
          </Button>
          <Popover categories={categories} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => onSeachKeyChange(e.target.value)}
              onKeyPress={onKeyPress}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {appState.isLogin
              ? <React.Fragment>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </React.Fragment>
              : <React.Fragment>
                <Button onClick={onClickLogin} variant="contained" style={{ marginRight: 12, width: 125, fontWeight: 'bold' }} >{'Đăng nhập'}</Button>
                <Button onClick={onClickSignUp} style={{ width: 125, backgroundColor: 'rgb(28,29,31)', color: 'white', fontWeight: 'bold' }} >{'Đăng ký'}</Button>
              </React.Fragment>}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
