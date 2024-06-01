import React from 'react';
import { Dialog, DialogContent, DialogTitle, Typography, Grid, Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';

const ItemDetailView = ({ item, open, onClose }) => {
  // Mock sales data for demonstration
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [65, 59, 80, 81, 56, 55],
      },
    ],
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{item.title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {/* Left side: Image and basic details */}
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="center" mb={2}>
              <img src={item.photo} alt={item.title} style={{ width: '80%', maxHeight: 300, objectFit: 'cover' }} />
            </Box>
            <Typography variant="subtitle1">Price: {item.price.toFixed(2)} MAD</Typography>
            <Typography variant="subtitle1">Category: {item.category}</Typography>
            <Typography variant="subtitle1">Card Amount: {item.cardAmount}</Typography> {/* Display card amount */}
            {/* Add more basic details here */}
          </Grid>
          {/* Right side: Charts and 3D model */}
          <Grid item xs={12} md={6}>
            {/* Chart: Item Sales */}
            <Box mb={2}>
              <Typography variant="h6" gutterBottom>Sales Data</Typography>
              <Bar data={salesData} />
            </Box>
            {/* 3D Model */}
            <Box mb={2} display="flex" justifyContent="center">
              {/* Add your 3D model component here */}
              {/* For example, you can use a library like react-three-fiber */}
              {/* <Your3DModelComponent /> */}
              <Typography variant="subtitle2">(3D Model representation here)</Typography>
            </Box>
            {/* Additional charts or info can be added here */}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDetailView;
