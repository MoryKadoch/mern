import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('jwt'));
    const [role, setRole] = useState(localStorage.getItem('role'));
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        setRole(localStorage.getItem('role'));
    }, [isLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('role');
        setIsLoggedIn(false);
        setRole(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                        Ligue sportive
                    </Link>
                </Typography>
                {isLoggedIn ? (
                    <>
                        {role === 'admin' && (
                            <>
                                <Button color="inherit" onClick={handleClick}>
                                    Admin
                                </Button>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose} component={Link} to="/admin/user-list">
                                        Utilisateurs
                                    </MenuItem>
                                    <MenuItem onClick={handleClose} component={Link} to="/admin/product-list">
                                        Produits
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                        <Button color="inherit" component={Link} to="/cart">
                            Panier
                        </Button>
                        <Button color="inherit" component={Link} to="/edit-profile">
                            Mon compte
                        </Button>
                        <Button color="inherit" onClick={handleLogout}>
                            Déconnexion
                        </Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">
                            Connexion
                        </Button>
                        <Button color="inherit" component={Link} to="/signup">
                            Inscription
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
