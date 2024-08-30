import React, { useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Paper, Box, IconButton, TextField, Button } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridCellEditStopParams,
  GridCellEditStopReasons,
  GridRowSelectionModel
} from '@mui/x-data-grid';
import UserListSkeleton from './UserListSkeleton';
import { editUser, deleteUser, deleteAllUsers } from '../Redux/App/Actions';
import UserForm from './userForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.users);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 5,
    page: 0,
  });
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const handleCellEditCommit = useCallback(
    (params: GridCellEditStopParams) => {
      if (params.reason === GridCellEditStopReasons.cellFocusOut) {
        const updatedUser = {
          ...users.find((user: any) => user.id === params.id),
          [params.field]: params.value,
        };
        dispatch(editUser(updatedUser));
      }
    },
    [users, dispatch],
  );

  const handleEdit = (user: any) => {
    setEditingUser(user);
  };
  const handleDelete = (id: number) => {
    dispatch(deleteUser(id));
  };

  const handleCloseUserForm = () => {
    setEditingUser(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user: any) =>
      Object.values(user).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [users, searchTerm]);

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete all users?')) {
      dispatch(deleteAllUsers());
      setSelectionModel([]);
    }
  };

  const handleEditAll = () => {
    // Open a dialog to edit all selected users
    // This is a placeholder - you'll need to implement this functionality
    console.log("Edit all selected users:", selectionModel);
  };

  const allRowsSelected = selectionModel.length === filteredUsers.length;

  if (loading) return <UserListSkeleton />;

  if (!users.length) {
    return (
      <Typography variant="h6" color="error">
        No users found
      </Typography>
    );
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 20 },
    {
      field: 'firstName',
      headerName: 'First Name',
      width: 200,
      editable: true,
    },
    { field: 'lastName', headerName: 'Last Name', width: 200, editable: true },
    { field: 'email', headerName: 'Email', width: 300, editable: true },
    {
      field: 'department',
      headerName: 'Department',
      width: 150,
      editable: true,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 138,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />
      <Box sx={{ mb: 2 }}>
        {allRowsSelected && (
          <>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={handleDeleteAll} 
              sx={{ mr: 2 }}
            >
              Delete All ({selectionModel.length})
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleEditAll}
            >
              Edit All ({selectionModel.length})
            </Button>
          </>
        )}
      </Box>
      <Paper
        elevation={3}
        sx={{ height: '100%', width: '100%', overflow: 'hidden', borderRadius: 2 }}
      >
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 15, 20]}
          checkboxSelection
          disableRowSelectionOnClick
          editMode="cell"
          onCellEditStop={handleCellEditCommit}
          rowSelectionModel={selectionModel}
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
            console.log("Selection changed:", newSelectionModel); // Add this line for debugging
          }}
          sx={{
            width: '100%',
            height: '100%',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
            '& .MuiDataGrid-row:nth-of-type(even)': {
              bgcolor: '#d7e6fb',
            },
            '& .MuiDataGrid-columnHeader': {
              bgcolor: '#1976d2',
              color: 'white',
              fontFamily: "roboto",
              fontSize:"16px",
            },
            '& .MuiDataGrid-cellContent': {
              fontWeight: 'normal',
            },
            border: 'none',
          }}
        />
      </Paper>
      {editingUser && (
        <UserForm user={editingUser} onClose={handleCloseUserForm} />
      )}
    </Box>
  );
};

export default UserList;
