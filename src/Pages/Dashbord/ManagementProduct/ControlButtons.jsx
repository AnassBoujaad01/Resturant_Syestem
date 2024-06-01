import React from 'react';
import { Button } from '@mui/material';
import { FaPlus, FaEdit } from 'react-icons/fa';

const ControlButtons = () => {
  return (
    <div className="flex justify-end space-x-4 my-4">
      <Button variant="contained" color="primary" startIcon={<FaPlus />}>
        Ajouter Categories
      </Button>
      <Button variant="contained" color="secondary" startIcon={<FaEdit />}>
        Modifier Categories
      </Button>
    </div>
  );
};

export default ControlButtons;
