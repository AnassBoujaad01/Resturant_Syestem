import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Avatar, Tooltip } from '@mui/material';
import { Edit, Visibility, Delete } from '@mui/icons-material';

const ItemTable = ({ items, onView, onUpdate, onDelete }) => {
  const handleView = (item) => {
    if (onView) {
      onView(item);
    }
  };

  const handleUpdate = (item) => {
    if (onUpdate) {
      onUpdate(item);
    }
  };

  const handleDelete = (itemId) => {
    if (onDelete) {
      onDelete(itemId);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 450 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Photo</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                <Avatar 
                  src={item.photo} 
                  alt={item.title} 
                  variant="rounded" 
                  sx={{ width: 64, height: 64 }} 
                />
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.price.toFixed(2)} MAD</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell align="center">
                <Tooltip title="View">
                  <IconButton color="primary" size="large" onClick={() => handleView(item)}>
                    <Visibility fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton color="primary" size="large" onClick={() => handleUpdate(item)}>
                    <Edit fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton color="error" size="large" onClick={() => handleDelete(item.id)}>
                    <Delete fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemTable;
