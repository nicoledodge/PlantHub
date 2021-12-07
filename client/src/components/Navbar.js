import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import "../App.css"
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom"
import profilePic from "../pages/assets/profilepic.jpeg";
import Login from "./Login"
import SignUp from "./SignUp"
import {Modal} from "@mui/material";

const pages = ['MyGarden', 'Forum', 'PlantCare'];


const Nav = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [loginToggle, setLoginToggle] = React.useState(false);
    const [signUpToggle, setSignUpToggle] = React.useState(false);


    const handleLoginModal = () => {
        setLoginToggle(!loginToggle);
    };

    const handleSignUpModal = () => {
        setSignUpToggle(!signUpToggle);
    };

    const settings = [
        {
            name: 'Profile',
            callback: null,
        },
        {
            name:'Account',
            callback: null,
        },
        {
            name:'Dashboard',
            callback: null,
        },
        {
            name:'SignUp',
            callback: handleSignUpModal,
        },
        {
            name:'Login',
            callback: handleLoginModal,
        },
    ];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <AppBar position="static" style={{background: '#4F5902'}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Link to="/">
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{display: {xs: 'none', md: 'flex'}}}
                            >
                                <img id="logo" src="./images/logo.png" alt="Planthub Logo"/>
                            </Typography>
                        </Link>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{flexGrow: 1, color: 'white', display: {xs: 'flex', md: 'none'}}}
                        >

                        {settings.map((setting) => (
                                <MenuItem key={setting[0]} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            BING BONG
                        </Typography>
                        <Box sx={{
                            flexGrow: 1,
                            display: {xs: 'none', md: 'flex', justifyContent: "center", gap: "40px"}
                        }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    href={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{fontSize: "15px", my: 2, color: '#EBDBAE', display: 'block'}}
                                >
                                    {page}
                                </Button>

                            ))}
                        </Box>

                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Girl with plant" src={profilePic}/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting, key) => (
                                    <MenuItem key={key} onClick={() => { handleCloseNavMenu(); setting.callback()}}>
                                        <Typography textAlign="center">{setting.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Modal
                open={loginToggle}
                onClose={handleLoginModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Login handleLoginModal={handleLoginModal.bind(this)}
                       handleSignUp={handleSignUpModal.bind(this)}/>
            </Modal>
            <Modal
                open={signUpToggle}
                onClose={handleSignUpModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <SignUp/>
            </Modal>
        </>
    );
};
export default Nav;