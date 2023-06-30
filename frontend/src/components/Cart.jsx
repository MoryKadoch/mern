import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Typography, Button } from '@material-ui/core';

const Cart = () => {
    const [cart, setCart] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        let cart = localStorage.getItem('cart');
        cart = cart ? JSON.parse(cart) : {};
        setCart(cart);

        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/product');
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchProducts();
    }, []);

    if (Object.keys(cart).length === 0 || products.length === 0) {
        return <Typography variant="h2">Votre panier est vide</Typography>;
    }

    const removeFromCart = async (id) => {
        let newCart = { ...cart };
        delete newCart[id];
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
    };

    const validateCart = async () => {
        for (let productId in cart) {
            try {
                await axios.post(`http://localhost:5000/api/product/deduct-stock/${productId}`, { quantity: cart[productId] });
            } catch (error) {
                console.error(error);
            }
        }
        localStorage.removeItem('cart');
        setCart({});
    };

    return (
        <Grid container spacing={4} style={{ padding: '20px 0' }}>
            <Grid item xs={12}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Titre</TableCell>
                                <TableCell>Quantité</TableCell>
                                <TableCell>Retirer du panier</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(cart).map((productId, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <img src={products.find(product => product._id === productId).img} alt={productId} height="100" />
                                    </TableCell>
                                    <TableCell>
                                        {products.find(product => product._id === productId).title}
                                    </TableCell>
                                    <TableCell>
                                        {cart[productId]}
                                    </TableCell>
                                    <TableCell>
                                        <Button size="small" color="primary" onClick={() => removeFromCart(productId)}>
                                            Retirer
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="primary" onClick={validateCart}>
                    Valider le panier
                </Button>
            </Grid>
        </Grid>
    );
};

export default Cart;
