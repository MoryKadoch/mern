import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField} from '@material-ui/core';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const config = {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                };
                const response = await axios.get('http://localhost:5000/api/user', config);
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);

    const handleEdit = (id) => {
        window.location.href = `/admin/edit-user/${id}`;
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('jwt');
            const config = {
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                },
            };
            await axios.delete(`http://localhost:5000/api/user/${id}`, config);
            setUsers(users.filter((user) => user._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        (`${user.firstName} ${user.lastName}`).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container style={{ marginTop: '20px', marginBottom: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                User List
            </Typography>
            <TextField
                style={{ margin: '10px auto', width: '80%' }}
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search for a user..."
            />
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell component="th" scope="row">
                                    {`${user.firstName} ${user.lastName}`}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleEdit(user._id)} style={{ marginRight: '10px' }}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(user._id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default UserList;
