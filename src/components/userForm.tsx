import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, editUser } from '../Redux/App/Actions';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

interface UserFormProps {
    user?: any;
    onClose: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(user || { id: uuidv4(), firstName: '', lastName: '', email: '', department: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (user) {
            dispatch(editUser(formData));
            toast.success('User updated successfully');
        } else {
            dispatch(addUser(formData));
            toast.success('User added successfully');
        }
        onClose();
    };

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>{user ? 'Edit User' : 'Add User'}</DialogTitle>
            <DialogContent>
                <TextField name="firstName" label="First Name" value={formData.firstName} onChange={handleChange} fullWidth margin="dense" />
                <TextField name="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} fullWidth margin="dense" />
                <TextField name="email" label="Email" value={formData.email} onChange={handleChange} fullWidth margin="dense" />
                <TextField name="department" label="Department" value={formData.department} onChange={handleChange} fullWidth margin="dense" />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary">{user ? 'Save' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserForm;
