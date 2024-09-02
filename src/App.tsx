// src/App.tsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers } from './Redux/App/Actions';
import { Container, Typography,Paper } from '@mui/material';
import UserActions from './components/userActions';
import UserList from './components/userList';
import Box from '@mui/material/Box';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const departments = ['Engineering', 'Marketing', 'Human Resources'];

        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data) => {
                const users = data.map((user: any) => ({
                    id: user.id,
                    firstName: user.name.split(' ')[0],
                    lastName: user.name.split(' ')[1] || '',
                    email: user.email,
                    department: departments[Math.floor(Math.random() * departments.length)], 
                }));
                dispatch(fetchUsers(users));
            });
    }, [dispatch]);

    
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 6, borderRadius: 2, backgroundColor: '#f5f5f5',height:'80vh' }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: '#1976d2' }}>
                User Management Dashboard
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, }}>
                <UserActions />
                <UserList />
            </Box>
        </Paper>
        <ToastContainer />
    </Container>
    );
};

export default App;
