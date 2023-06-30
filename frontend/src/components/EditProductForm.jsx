import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@material-ui/core';

const EditProductForm = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [img, setImg] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/product/${id}`);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setPrice(response.data.price);
                setStock(response.data.stock);
                setImg(response.data.img);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedProduct = { title, description, price, stock, img };
        try {
            const token = localStorage.getItem('jwt');
            const config = {
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                },
            };
            await axios.put(`http://localhost:5000/api/product/${id}`, updatedProduct, config);
            window.location.href = '/admin/product-list';
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box my={8}>
                <Typography variant="h4" align="center" gutterBottom>
                    Edit Product
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Image URL"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Update Product
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default EditProductForm;
