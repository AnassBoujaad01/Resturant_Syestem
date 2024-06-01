import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { styled } from '@mui/system';

const Clock = styled('div')({
  fontSize: '1.5rem',
  marginBottom: '20px',
});

const ShiftManagement = () => {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [open, setOpen] = useState(false);
  const [currentShift, setCurrentShift] = useState({ id: null, cashier: '', start: '', end: '' });
  const [orders, setOrders] = useState([
    { id: 1, status: 'paid', price: 29.99 },
    { id: 2, status: 'pending', price: 15.49 },
    { id: 3, status: 'paid', price: 42.00 },
  ]);
  const [totalPaidOrders, setTotalPaidOrders] = useState(0);
  const [totalPendingOrders, setTotalPendingOrders] = useState(0);
  const [totalPricePaidOrders, setTotalPricePaidOrders] = useState(0);
  const [totalPricePendingOrders, setTotalPricePendingOrders] = useState(0);
  const [totalAmountEarned, setTotalAmountEarned] = useState(0);
  const [cashierAmount, setCashierAmount] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(dayjs().diff(startTime, 'second'));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  useEffect(() => {
    const totalPaid = orders.filter(order => order.status === 'paid');
    const totalPending = orders.filter(order => order.status === 'pending');
    const totalPricePaid = totalPaid.reduce((acc, order) => acc + order.price, 0);
    const totalPricePending = totalPending.reduce((acc, order) => acc + order.price, 0);
    setTotalPaidOrders(totalPaid.length);
    setTotalPendingOrders(totalPending.length);
    setTotalPricePaidOrders(totalPricePaid);
    setTotalPricePendingOrders(totalPricePending);
    setTotalAmountEarned(totalPricePaid + totalPricePending);
  }, [orders]);

  const handleStartShift = () => {
    setStartTime(dayjs());
    setOpen(true);
  };

  const handleCloseShift = () => {
    setOpen(false);
    setCurrentShift({ id: null, cashier: '', start: '', end: '' });
  };

  const handleRemoveOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  const handleCancelOrder = (orderId) => {
    setOrders(orders.map(order => (order.id === orderId ? { ...order, status: 'canceled' } : order)));
  };

  const handleCashierStart = () => {
    // Start work on cashier logic here
    if (cashierAmount) {
      console.log('Cashier amount:', cashierAmount);
      // Reset cashier amount after starting work
      setCashierAmount('');
    } else {
      console.log('Please enter an amount to start work on the cashier.');
    }
  };
  const handleSaveShift =()=>{
    
  }

  return (
    <div className="container mx-auto">
      <Typography variant="h4" component="h1" gutterBottom>
        Shift Management
      </Typography>
      
      <Button variant="contained" color="primary" onClick={handleStartShift}>
        Start Shift
      </Button>

      {startTime && (
        <Clock>
          Date and Time Work Started: {dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')}
          <br />
          Elapsed Time: {dayjs().startOf('day').second(elapsedTime).format('HH:mm:ss')}
        </Clock>
      )}

      <div className="flex justify-between space-x-4 mb-4">
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Orders
            </Typography>
            <Typography>Total Paid: {totalPaidOrders}</Typography>
            <Typography>Total Pending: {totalPendingOrders}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Total Price
            </Typography>
            <Typography>Paid Orders: ${totalPricePaidOrders.toFixed(2)}</Typography>
            <Typography>Pending Orders: ${totalPricePendingOrders.toFixed(2)}</Typography>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between space-x-4 mb-4">
        <Button variant="contained" color="secondary" onClick={handleRemoveOrder}>
          Remove Order
        </Button>
        <Button variant="contained" color="error" onClick={handleCancelOrder}>
          Cancel Order
        </Button>
      </div>

      <div>
        <TextField
          label="Amount to Start Work on Cashier"
          type="number"
          fullWidth
          value={cashierAmount}
          onChange={(e) => setCashierAmount(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <Button variant="contained" color="primary" onClick={handleCashierStart}>
          Start Work on Cashier
        </Button>
      </div>

      <Dialog open={open} onClose={handleCloseShift}>
        <DialogTitle>{currentShift.id ? 'Edit Shift' : 'Add Shift'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Cashier"
            fullWidth
            value={currentShift.cashier}
            onChange={(e) => setCurrentShift({ ...currentShift, cashier: e.target.value })}
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label="Start"
            type="datetime-local"
            fullWidth
            value={currentShift.start}
            onChange={(e) => setCurrentShift({ ...currentShift, start: e.target.value })}
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label="End"
            type="datetime-local"
            fullWidth
            value={currentShift.end}
            onChange={(e) => setCurrentShift({ ...currentShift, end: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseShift}>Cancel</Button>
          <Button onClick={handleSaveShift}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShiftManagement;

