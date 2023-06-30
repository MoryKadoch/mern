import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@material-ui/core';

const EditUserForm = () => {
    const { id } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/${id}`);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setPhone(response.data.phone);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedUser = { firstName, lastName, email, phone };
        try {
            await axios.put(`http://localhost:5000/api/user/${id}`, updatedUser);
            window.location.href = '/user-list';
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box my={8}>
                <Typography variant="h4" align="center" gutterBottom>
                    Edit User
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Update User
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default EditUserForm;