import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@material-ui/core';

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

    if (Object.keys(cart).length === 0 && cart.constructor === Object) {
        return <Typography variant="h2">Votre panier est vide</Typography>;
    }

    const removeFromCart = async (id) => {
        let cart = {...cart};
        delete cart[id];
        localStorage.setItem('cart', JSON.stringify(cart));
        setCart(cart);
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

    if(products.length === 0) {
        return <Typography variant="h2">Chargement...</Typography>;
    }

    return (
        <Grid container spacing={4}>
            {Object.keys(cart).map((productId, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card>
                        <CardContent>
                            <CardMedia component="img" alt={productId} height="140" image={products.find(product => product._id === productId).img} />
                            <Typography gutterBottom variant="h5" component="h2">
                                {products.find(product => product._id === productId).title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Quantity: {cart[productId]}
                            </Typography>
                            <Button size="small" color="primary" onClick={() => removeFromCart(productId)}>
                                Retirer du panier
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
            <Button size="large" color="primary" onClick={validateCart}>
                Valider le panier
            </Button>
        </Grid>
    );
};

export default Cart;