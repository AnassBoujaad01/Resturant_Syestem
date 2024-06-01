import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

function Management() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchItems();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/categories');
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to fetch categories');
      setLoading(false);
    }
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/items');
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
      setError('Failed to fetch items');
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    try {
      setLoading(true);
      await axios.post('/api/categories', { name: newCategoryName });
      setNewCategoryName('');
      fetchCategories();
      setDialogOpen(false);
    } catch (error) {
      console.error('Error adding category:', error);
      setError('Failed to add category');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = async () => {
    try {
      setLoading(true);
      await axios.put(`/api/categories/${selectedCategory.id}`, { name: newCategoryName });
      setNewCategoryName('');
      fetchCategories();
      setDialogOpen(false);
    } catch (error) {
      console.error('Error updating category:', error);
      setError('Failed to update category');
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    try {
      setLoading(true);
      await axios.post('/api/items', { name: newItemName, categoryId: selectedCategory.id });
      setNewItemName('');
      fetchItems();
      setDialogOpen(false);
    } catch (error) {
      console.error('Error adding item:', error);
      setError('Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  const handleEditItem = async () => {
    try {
      setLoading(true);
      await axios.put(`/api/items/${selectedItemId}`, { name: newItemName });
      setNewItemName('');
      fetchItems();
      setDialogOpen(false);
    } catch (error) {
      console.error('Error updating item:', error);
      setError('Failed to update item');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      setLoading(true);
      await axios.delete(`/api/items/${itemId}`);
      fetchItems();
      setDialogOpen(false);
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Failed to delete item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Categories and Items
      </Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={3}>
        {/* Category Management */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Categories
              </Typography>
              {categories.map((category) => (
                <div key={category.id}>
                  <Typography>{category.name}</Typography>
                  <IconButton onClick={() => { setEditMode(true); setSelectedCategory(category); setNewCategoryName(category.name); setDialogOpen(true); }}>
                    <Edit />
                  </IconButton>
                </div>
              ))}
              <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => { setEditMode(false); setSelectedCategory(null); setNewCategoryName(''); setDialogOpen(true); }}>
                Add Category
              </Button>
            </CardContent>
          </Card>
        </Grid>
        {/* Item Management */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
            <Typography variant="h6" gutterBottom>
                Items
              </Typography>
              {items.map((item) => (
                <div key={item.id}>
                  <Typography>{item.name}</Typography>
                  <IconButton onClick={() => { setEditMode(true); setSelectedItemId(item.id); setNewItemName(item.name); setDialogOpen(true); }}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => { setSelectedItemId(item.id); setDialogOpen(true); }}>
                    <Delete />
                  </IconButton>
                </div>
              ))}
              <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => { setEditMode(false); setSelectedItemId(null); setNewItemName(''); setDialogOpen(true); }}>
                Add Item
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog for Adding/Editing Categories and Items */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{editMode ? `Edit ${selectedCategory ? 'Category' : 'Item'}` : `Add ${selectedCategory ? 'Category' : 'Item'}`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={selectedCategory ? 'Category Name' : 'Item Name'}
            fullWidth
            value={selectedCategory ? newCategoryName : newItemName}
            onChange={(e) => selectedCategory ? setNewCategoryName(e.target.value) : setNewItemName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          {editMode ? (
            <Button onClick={selectedCategory ? handleEditCategory : handleEditItem} color="primary">Save</Button>
          ) : (
            <Button onClick={selectedCategory ? handleAddCategory : handleAddItem} color="primary">Add</Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Management;
