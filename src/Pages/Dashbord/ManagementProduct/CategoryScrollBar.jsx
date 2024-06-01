import React, { useState } from 'react';
import { IconButton, TextField, Button, Modal, Box, Avatar, Typography } from '@mui/material';
import { Add, Edit, Delete, PhotoCamera } from '@mui/icons-material';
import Keyboard from '../../../Components/keyboard';


const defaultImage = 'https://via.placeholder.com/150';

const CategoryScrollBar = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Pizza', image: defaultImage },
    { id: 2, name: 'Burgers', image: defaultImage },
    { id: 3, name: 'Tacos', image: defaultImage },
    { id: 4, name: 'Sushi', image: defaultImage },
    { id: 5, name: 'Pasta', image: defaultImage },
    { id: 6, name: 'Salads', image: defaultImage },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ id: '', name: '', image: defaultImage });
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const handleAddCategory = () => {
    setCategories([...categories, { ...currentCategory, id: categories.length + 1 }]);
    handleCloseModal();
  };

  const handleUpdateCategory = () => {
    const updatedCategories = categories.map((cat, index) =>
      index === currentIndex ? currentCategory : cat
    );
    setCategories(updatedCategories);
    handleCloseModal();
  };

  const handleDeleteCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleOpenModal = (category = { id: '', name: '', image: defaultImage }, index = null) => {
    setCurrentCategory(category);
    setCurrentIndex(index);
    setIsEditMode(index !== null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCategory({ id: '', name: '', image: defaultImage });
    setCurrentIndex(null);
    setIsKeyboardOpen(false); // Close the keyboard when the modal is closed
  };


  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentCategory((prevCategory) => ({
          ...prevCategory,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyPress = (key) => {
    if (key === 'Enter') {
      setIsKeyboardOpen(false); 
    } else if (key === 'Backspace') {
      setCurrentCategory((prevCategory) => ({
        ...prevCategory,
        name: prevCategory.name.slice(0, -1), // Remove the last character
      }));
    } else {
      setCurrentCategory((prevCategory) => ({
        ...prevCategory,
        name: prevCategory.name + key,
      }));
    }
  };

  return (
    <div className="p-4 bg-gray-100 h- w-full  overflow-hidden">
      <div className="flex flex-nowrap space-x-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollBehavior: 'smooth' }}>
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md min-w-max"
          >
            <Avatar 
              src={category.image} 
              alt={category.name} 
              className="w-36 h-36 mb-2" 
              sx={{ width: 144, height: 144 }} 
            />
            <div className="text-center text-gray-700 font-bold mb-2">{category.name}</div>
            <div className="flex space-x-2">
              <IconButton color="primary" onClick={() => handleOpenModal(category, index)}>
                <Edit />
              </IconButton>
              <IconButton color="error" onClick={() => handleDeleteCategory(index)}>
                <Delete />
              </IconButton>
            </div>
          </div>
        ))}
        <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md min-w-max">
          <IconButton color="primary" onClick={() => handleOpenModal()}>
            <Add sx={{ fontSize: 48 }} />
          </IconButton>
          <div className="text-center text-gray-700 font-bold">Add Category</div>
        </div>
      </div>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
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
            width: 300,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            {isEditMode ? 'Update Category' : 'Add Category'}
          </Typography>
          <TextField
            label="Category ID"
            variant="outlined"
            fullWidth
            value={currentCategory.id}
            InputProps={{
              readOnly: true,
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Category Name"
            variant="outlined"
            fullWidth
            value={currentCategory.name}
            onFocus={() => setIsKeyboardOpen(true)}
            onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
          />
          <Button
            variant="contained"
            component="label"
            startIcon={<PhotoCamera />}
            sx={{ mt: 2, mb: 2 }}
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          <Avatar
            src={currentCategory.image}
            alt="Category"
            sx={{ width: 144, height: 144 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={isEditMode ? handleUpdateCategory : handleAddCategory}
          >
            {isEditMode ? 'Update Category' : 'Add Category'}
          </Button>
        </Box>
      </Modal>

      {isKeyboardOpen && (
        <div className=" fixed bottom-0 left-0 right-0 " style={{zIndex:'1500'}}>
          <Keyboard onKeyPress={handleKeyPress} />
        </div>
      )}
    </div>
  );
};

export default CategoryScrollBar;
