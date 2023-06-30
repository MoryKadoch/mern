import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, TextField, Box, useTheme, Checkbox } from '@material-ui/core';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        title: '',
        description: '',
        price: '',
        stock: '',
        img: ''
    });
    const [selectedProducts, setSelectedProducts] = useState([]);

    const theme = useTheme();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const config = {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                };
                const response = await axios.get('http://localhost:5000/api/product', config);
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, []);

    const handleEdit = (id) => {
        window.location.href = `/admin/edit-product/${id}`;
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('jwt');
            const config = {
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                },
            };
            await axios.delete(`http://localhost:5000/api/product/${id}`, config);
            setProducts(products.filter((product) => product._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('jwt');
            const config = {
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                },
            };
            const response = await axios.post('http://localhost:5000/api/product/add', newProduct, config);
            setProducts([...products, response.data]);
            handleClose();
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectClick = (id) => {
        const selectedProductIndex = selectedProducts.indexOf(id);
        let newSelectedProducts = [];

        if (selectedProductIndex === -1) {
            newSelectedProducts = newSelectedProducts.concat(selectedProducts, id);
        } else if (selectedProductIndex === 0) {
            newSelectedProducts = newSelectedProducts.concat(selectedProducts.slice(1));
        } else if (selectedProductIndex === selectedProducts.length - 1) {
            newSelectedProducts = newSelectedProducts.concat(selectedProducts.slice(0, -1));
        } else if (selectedProductIndex > 0) {
            newSelectedProducts = newSelectedProducts.concat(
                selectedProducts.slice(0, selectedProductIndex),
                selectedProducts.slice(selectedProductIndex + 1),
            );
        }

        setSelectedProducts(newSelectedProducts);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelectedProducts = products.map((product) => product._id);
            setSelectedProducts(newSelectedProducts);
            return;
        }
        setSelectedProducts([]);
    };

    const handleDeleteSelected = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const config = {
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                },
            };
            await Promise.all(
                selectedProducts.map((id) => axios.delete(`http://localhost:5000/api/product/${id}`, config))
            );
            setProducts(products.filter((product) => selectedProducts.indexOf(product._id) === -1));
            setSelectedProducts([]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container style={{ marginTop: '20px', marginBottom: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Product List
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: '20px' }}>
                + Add Product
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', backgroundColor: theme.palette.background.paper, border: '2px solid #000', boxShadow: '24', padding: '16px' }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Add Product
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField name="title" label="Title" value={newProduct.title} onChange={handleChange} fullWidth margin="normal" />
                        <TextField name="description" label="Description" value={newProduct.description} onChange={handleChange} fullWidth margin="normal" />
                        <TextField name="price" label="Price" value={newProduct.price} onChange={handleChange} fullWidth margin="normal" />
                        <TextField name="stock" label="Stock" value={newProduct.stock} onChange={handleChange} fullWidth margin="normal" />
                        <TextField name="img" label="URL de l'image" value={newProduct.img} onChange={handleChange} fullWidth margin="normal" />
                        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
                            Add
                        </Button>
                    </form>
                </Box>
            </Modal>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedProducts.length === products.length && products.length !== 0}
                                    onChange={handleSelectAllClick}
                                    color="primary"
                                />
                            </TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product._id}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedProducts.indexOf(product._id) !== -1}
                                        onChange={() => handleSelectClick(product._id)}
                                        color="primary"
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">{product.title}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell><img src={product.img} alt="product-img" style={{ width: '50px', height: '50px' }} /></TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleEdit(product._id)} style={{ marginRight: '10px' }}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(product._id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" color="secondary" onClick={handleDeleteSelected} style={{ marginBottom: '20px', marginLeft: '20px', marginTop: '20px' }}>
                Delete Selected
            </Button>
        </Container>
    );
};

export default ProductList;