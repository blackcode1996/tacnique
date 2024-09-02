import React, { useState } from 'react';
import { Button } from '@mui/material';
import UserForm from './userForm';

const UserActions: React.FC = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Add User
            </Button>
            {open && <UserForm onClose={handleClose} />}
        </>
    );
};

export default UserActions;
