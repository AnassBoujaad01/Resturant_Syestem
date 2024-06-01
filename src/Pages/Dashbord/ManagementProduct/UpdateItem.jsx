import React, { useState, useRef } from 'react';
import {
  Modal, Box, Button, TextField, Typography, IconButton, MenuItem, Avatar, Stack
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import Keyboard from '../../../Components/keyboard';

const UpdateItem = ({ open, onClose, onUpdate, item }) => {
  const categories = ['PIZZA', 'TACOS', 'PASTICCIO'];

  // State variables
  const [title, setTitle] = useState(item.title);
  const [price, setPrice] = useState(item.price.toString());
  const [category, setCategory] = useState(item.category);
  const [photo, setPhoto] = useState(item.photo);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [keyboardTarget, setKeyboardTarget] = useState('');

  // References for input fields
  const titleRef = useRef(null);
  const priceRef = useRef(null);

  // Handles updating the item
  const handleUpdateItem = () => {
    if (title && price && category) {
      const updatedItem = { ...item, title, price: parseFloat(price), category, photo };
      onUpdate(updatedItem);
      handleClose();
    } else {
      alert('Please fill in all fields');
    }
  };

  // Handles key press for the custom keyboard
  const handleKeyPress = (key) => {
    switch (keyboardTarget) {
      case 'title':
        if (key === 'Backspace') {
          setTitle((prev) => prev.slice(0, -1));
        } else {
          setTitle((prev) => prev + key);
        }
        break;
      case 'price':
        if (key === 'Backspace') {
          setPrice((prev) => prev.slice(0, -1));
        } else if (!isNaN(key) || key === '.') {
          setPrice((prev) => prev + key);
        }
        break;
      default:
        break;
    }
  
    if (key === 'Enter') {
      setIsKeyboardOpen(false);
    }
  };
  

  // Handles click on input fields to open the custom keyboard
  const handleInputClick = (target) => {
    setIsKeyboardOpen(true);
    setKeyboardTarget(target);
  };

  // Handles file change for photo upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handles closing the modal and resetting the state
  const handleClose = () => {
    onClose();
    // Reset state or any other cleanup logic
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          width: 600,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
          <Typography variant="h5" align="center">
            Update Item
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <label htmlFor="photo-upload">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="photo-upload"
              style={{ display: 'none' }}
            />
            <IconButton component="span">
              <PhotoCameraIcon />
            </IconButton>
          </label>
          {photo && <Avatar src={photo} sx={{ width: '100px', height: '100px' }} />}
        </Stack>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          inputRef={titleRef}
          onClick={() => handleInputClick('title')}
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          value={price}
          inputRef={priceRef}
          onClick={() => handleInputClick('price')}
        />
        <TextField
          select
          label="Category"
          variant="outlined"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="">Select Category</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateItem}
          disabled={!category || !price || !title  }
          sx={{ mt: 2 }} 
        >
          Update
        </Button>
        {isKeyboardOpen && (
          <Box
            sx={{
              position: 'relative',
              bottom: 0,
              left: 0,
              zIndex: 1300,
              width: '100%',  // Ensure full width
              padding:'10px' // Set appropriate height
            }}
          >
            <Keyboard onKeyPress={handleKeyPress} className="w-full h-full" />
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default UpdateItem;
