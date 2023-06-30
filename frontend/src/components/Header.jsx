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
                                        Utilisateurs
                                    </Link>
                                    <Link to="/admin/product-list" style={{ color: 'white', textDecoration: 'none', marginLeft: '16px' }}>
                                        Produits
                                    </Link>
                                </>
                            )}
                            <>
                                <Link to="/cart" style={{ color: 'white', textDecoration: 'none', marginLeft: '16px' }}>
                                    Panier
                                </Link>
                                <Link to="/edit-profile" style={{ color: 'white', textDecoration: 'none', marginLeft: '16px' }}>
                                    Mon compte
                                </Link>
                                <Link to="/logout" style={{ color: 'white', textDecoration: 'none', marginLeft: '16px' }} onClick={handleLogout}>
                                    Déconnexion
                                </Link>
                            </>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ color: 'white', textDecoration: 'none', marginLeft: '16px' }}>
                                Connexion
                            </Link>
                            <Link to="/signup" style={{ color: 'white', textDecoration: 'none', marginLeft: '16px' }}>
                                Inscription
                            </Link>
                        </>
                    )}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
