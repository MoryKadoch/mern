import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('jwt'));
    const [role, setRole] = useState(localStorage.getItem('role'));

    useEffect(() => {
        setRole(localStorage.getItem('role'));
    }, [isLoggedIn]);

    const handleLogout = () => {
        // Supprimer le JWT et le rôle du localStorage
        localStorage.removeItem('jwt');
        localStorage.removeItem('role');
        // Mettre à jour l'état de connexion de l'utilisateur et le rôle
        setIsLoggedIn(false);
        setRole(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    <Link to="/" style={{ color: 'white', textDecoration: 'none', marginLeft: '16px' }}>
                        Accueil
                    </Link>
                    {isLoggedIn ? (
                        <>
                            {role === 'admin' && (
                                <>
                                    <Link to="/admin/user-list" style={{ color: 'white', textDecoration: 'none', marginLeft: '16px' }}>
                                        Users
                                    </Link>
                                    <Link to="/admin/product-list" style={{ color: 'white', textDecoration: 'none', marginLeft: '16px' }}>
                                        Products
                                    </Link>
                                </>
                            )}
                            <Link to="/logout" style={{ color: 'white', textDecoration: 'none', marginLeft: '16px' }} onClick={handleLogout}>
                                Logout
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ color: 'white', textDecoration: 'none', marginLeft: '16px' }}>
                                Login
                            </Link>
                            <Link to="/signup" style={{ color: 'white', textDecoration: 'none', marginLeft: '16px' }}>
                                Signup
                            </Link>
                        </>
                    )}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
