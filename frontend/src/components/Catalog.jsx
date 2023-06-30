import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardActionArea, CardContent, CardMedia, Typography, Button, TextField, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        margin: 'auto',
        borderRadius: 12,
        position: 'relative',
        boxShadow: '0 3px 6px 0 #555',
        cursor: 'pointer',
        '&:hover': {
            '& $image': {
                transform: 'scale(1.3)',
            },
        },
        marginBottom: 20,
        marginTop: 20,
    },
    content: {
        padding: 24,
        textAlign: 'left',
    },
    cta: {
        display: 'block',
        textAlign: 'center',
        color: '#000',
        letterSpacing: 2,
        fontSize: 12,
        marginTop: 10,
    },
    image: {
        transition: 'transform .2s ease-in-out',
    },
    title: {
        color: '#202020',
        textTransform: 'uppercase',
    },
    price: {
        color: '#5EAAA8',
        marginBottom: '0.3em',
    },
    quantity: {
        width: 60,
        marginBottom: 10,
    },
}));

const Catalog = () => {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/product');
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, []);

    const addToCart = (product, quantity) => {
        let cart = localStorage.getItem('cart');
        cart = cart ? JSON.parse(cart) : {};
        cart[product._id] = (cart[product._id] || 0) + quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Grid container spacing={4} style={{ padding: '20px 0' }}>
            <TextField
                style={{ margin: '10px auto', width: '80%' }}
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Rechercher un produit..."
            />
            {filteredProducts.map(product => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia component="img" className={classes.image} alt={product.title} height="140" image={product.img} />
                            <CardContent className={classes.content}>
                                <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {product.description}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {product.stock} en stock
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {product.price} €
                                </Typography>
                                <TextField
                                    className={classes.quantity}
                                    defaultValue={1}
                                    type="number"
                                    inputProps={{ min: 1, max: product.stock }}
                                    id={`quantity-${product._id}`}
                                />
                            </CardContent>
                        </CardActionArea>
                        <Button size="small" color="primary" className={classes.cta} onClick={() => addToCart(product, parseInt(document.getElementById(`quantity-${product._id}`).value))}>
                            Ajouter au panier
                        </Button>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Catalog;
