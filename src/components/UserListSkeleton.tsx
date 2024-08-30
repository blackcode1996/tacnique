import React from 'react';
import { Skeleton, Box, Paper } from '@mui/material';

const UserListSkeleton: React.FC = () => {
    return (
        <Box sx={{ height: 400, width: '100%', p: 2 }}>
            <Paper elevation={3} sx={{ height: '100%', p: 2 }}>
                {[...Array(5)].map((_, index) => (
                    <Skeleton
                        key={index}
                        variant="rectangular"
                        height={52}
                        sx={{ my: 1 }}
                        animation="wave"
                    />
                ))}
            </Paper>
        </Box>
    );
};

export default UserListSkeleton;