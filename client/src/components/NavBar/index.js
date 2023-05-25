import React, { useState } from "react";
import {Link} from "react-router-dom"
import getSettings from "./settings";
import Auth from "../../utils/auth";
import {AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import "../../App.css"
import profilePic from "../../pages/assets/profilepic.jpeg";
import {Modal} from "@mui/material";
import LoginModal from "./LoginModal"
import SignUpModal from "./SignupModal";
const Nav = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [loginToggle, setLoginToggle] = useState(false);
  const [signUpToggle, setSignUpToggle] = useState(false);
  const handleLoginModal = () => setLoginToggle(!loginToggle);
  const handleSignUpModal = () => setSignUpToggle(!signUpToggle);
  const logout = () => {
    Auth.logout();
    document.location.replace("/")
  };
  const settings = getSettings(handleSignUpModal, handleLoginModal, logout);
  const pages = ['MyGarden', 'Forum', 'PlantFacts'];
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleCloseUserMenu = () => setAnchorElUser(null);
  return <>
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
                            {settings.map((setting, key) => <Link to={setting.routeTo || '#'}>
                                <MenuItem key={key} onClick={() => {
                                    handleCloseNavMenu();
                                    setting.callback && setting.callback()}
                                }>
                                    <Typography textAlign="center">{setting.name}</Typography>

                                </MenuItem>

                                </Link>)}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, color: 'white', display: {xs: 'flex', md: 'none'}}}
                    >
                        <Link to="/" >
                        <img id="logo" src="./images/logo.png" alt="Planthub Logo"/>
                        </Link>
                    </Typography>
                    <Box sx={{
                        flexGrow: 1,
                        display: {xs: 'none', md: 'flex', justifyContent: "center", gap: "40px"}
                    }}>
                        {pages.map((page) => <Button
                                key={page}
                                href={page}
                                onClick={handleCloseNavMenu}
                                key={page}
                                sx={{fontSize: "15px", my: 2, color: '#EBDBAE', display: 'block'}}
                            >
                                {page}
                            </Button>)}
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
                            {settings.map((setting, key) => <Link to={setting.routeTo || '#'}>
                                <MenuItem key={key} onClick={() => {
                                    handleCloseNavMenu();
                                    setting.callback && setting.callback()}
                                }>
                                    <Typography textAlign="center">{setting.name}</Typography>

                                </MenuItem>

                                </Link>)}
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
            <LoginModal handleLoginModal={handleLoginModal.bind(this)}
                   handleSignUpModal={handleSignUpModal.bind(this)}/>
        </Modal>
        <Modal
            open={signUpToggle}
            onClose={handleSignUpModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <SignUpModal handleLoginModal={handleLoginModal.bind(this)}
                   handleSignUpModal={handleSignUpModal.bind(this)}/>
        </Modal>
    </>;
};

export default Nav;