import { useState, useEffect } from 'react';
import { Button, TextField, Container, Typography, Box } from '@material-ui/core';
import { Link } from 'react-router-dom'
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('jwt');

        if (token) {
            window.location.href = '/';
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/user/login', {
                email,
                password
            });

            const token = response.data.token;
            const role = response.data.role;

            localStorage.setItem('jwt', token);
            localStorage.setItem('role', role);

            console.log(response.data);
            window.location.href = '/';
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: '66px', marginBottom: '66px' }}>
            <Box my={8}>
                <Typography variant="h4" align="center" gutterBottom>
                    Sign In
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Sign In
                    </Button>
                </form>
                <Typography variant="body1" align="center" style={{ marginTop: '16px' }}>
                    Pas encore de compte ? <Link to="/signup">Créer un compte</Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default LoginForm;
