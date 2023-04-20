import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { getToken, removeToken } from '../utils/TokenHelper';
import { Link, useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';
import { useSelector } from 'react-redux';
import { saveItem, watchList } from './Redux/cartslice';
import { CiHeart } from 'react-icons/ci';

const drawerWidth = 240;


function DrawerAppBar(props) {
  const token = getToken();
  const [navItems, setNavItems] = React.useState(['Login']);
  const navigate = useNavigate();
  const count = useSelector(state => state.carts.cart);
  const counter = useSelector(state => state.carts.cartSave);

  function navbarSetter() {
    if (token) {
      console.log("token is ", token);
      setNavItems(['Home', 'About', 'Logout']);
    }
  }
  React.useEffect(() => {
    navbarSetter();
  }, []);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  function Logout() {
    console.log("logging out");
    removeToken();
    navigate('/login');

  }
  function Login() {
    navigate('/login');
  }
  function Home() {
    navigate('/');
  }
  function Cart() {
    navigate('/cart');
  }
  function Save() {
    navigate('/saveitem');
  }
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>

      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            E-commerce
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {token && <>

              <Button key='home' sx={{ color: '#fff' }} onClick={Home}>
                Home
              </Button>
              <Button key='cart' sx={{ color: '#fff' }} onClick={Cart}>
                <p className='bg-danger fs-6 rounded-circle text-light text-justify'><span className='text-danger'>..</span>{count}
                  <span className='text-danger'>..</span></p>
                Cart
              </Button>

              <Button sx={{ color: '#fff' }} onClick={Save}>
                <p className='bg-danger fs-6 rounded-circle text-light text-justify'><span className='text-danger'>..</span>{counter}
                  <span className='text-danger'>..</span></p><CiHeart size="23px"></CiHeart></Button>

              <Button key='about' sx={{ color: '#fff' }} >
                About
              </Button>
              <Button key='logout' sx={{ color: '#ffc107' }} onClick={Logout}>
                Logout
              </Button>
            </>}
            {!token && <>
              <Button key='home' variant="contained" color="success" sx={{ color: '#fff' }} onClick={Login} >
                Login
              </Button>
            </>}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
export default DrawerAppBar;