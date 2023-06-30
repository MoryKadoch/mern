import { useState, useEffect } from 'react';
import { Button, TextField, Container, Typography, Box, Checkbox, FormControlLabel } from '@material-ui/core';
import axios from 'axios';

const SignupForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jwt');

        if (token) {
            window.location.href = '/';
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/user/signup', {
                firstName,
                lastName,
                phone,
                email,
                password,
                role: isAdmin ? 'admin' : 'user'
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
                    Sign Up
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Phone Number"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
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
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Admin?"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Sign Up
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default SignupForm;
