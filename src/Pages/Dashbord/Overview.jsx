import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, MenuItem, Select, FormControl, InputLabel, Card, CardContent, CircularProgress, TextField } from '@mui/material';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import axios from 'axios'; // Assuming you're using axios for API requests

function Overview() {
  const [timePeriod, setTimePeriod] = useState('monthly');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [salesData, setSalesData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [productCategoryData, setProductCategoryData] = useState([]);
  const [orderStatusData, setOrderStatusData] = useState({});
  const [orderQuantityData, setOrderQuantityData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchData(timePeriod, startDate, endDate);
  }, [timePeriod, startDate, endDate]);

  const fetchData = async (period, start, end) => {
    setLoading(true);
    setError(null);
    try {
      // Example API endpoints and data structure
      const salesResponse = exampleSalesData;
      const customerResponse = exampleCustomerData;
      const productCategoryResponse = exampleProductCategoryData;
      const orderStatusResponse = exampleDoughnutData;
      const orderQuantityResponse = exampleOrderQuantityData;
      const revenueResponse = exampleRevenueData;
      const totalOrdersResponse = exampleTotalOrders;
      const totalRevenueResponse = exampleTotalRevenue;

      // Set the state with fetched data
      setSalesData(salesResponse[period]);
      setCustomerData(customerResponse[period]);
      setProductCategoryData(productCategoryResponse[period]);
      setOrderStatusData(orderStatusResponse);
      setOrderQuantityData(orderQuantityResponse[period]);
      setRevenueData(revenueResponse[period]);
      setTotalOrders(totalOrdersResponse);
      setTotalRevenue(totalRevenueResponse);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <Container className="overflow-scroll p-4 h-[calc(100vh-10rem)]" style={{scrollbarWidth:'none'}}>
      <Typography variant="h4" gutterBottom>
        Overview
      </Typography>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="time-period-label">Time Period</InputLabel>
        <Select
          labelId="time-period-label"
          id="time-period-select"
          value={timePeriod}
          onChange={handleTimePeriodChange}
          label="Time Period"
        >
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">Sales Over Time</Typography>
                <Line
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                    datasets: [
                      {
                        data: salesData,
                        label: 'Sales',
                        fill: false,
                        borderColor: '#3f51b5',
                        tension: 0.4,
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">Customer Growth</Typography>
                <Line
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                    datasets: [
                      {
                        data: customerData,
                        label: 'Customers',
                        fill: false,
                        borderColor: '#3f51b5',
                        tension: 0.4,
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">Product Category Sales</Typography>
                <Bar
                  data={{
                    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6'],
                    datasets: [
                      {
                        data: productCategoryData,
                        label: 'Sales',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">Order Status Distribution</Typography>
                <Doughnut
                  data={{
                    labels: ['Completed', 'Pending', 'Cancelled'],
                    datasets: [
                      {
                        data: Object.values(orderStatusData),
                        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
                        hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">Order Quantity Over Time</Typography>
                <Line
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                    datasets: [
                      {
                        data: orderQuantityData,
                        label: 'Order Quantity',
                        fill: false,
                        borderColor: '#3f51b5',
                        tension: 0.4,
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">Revenue Over Time</Typography>
                <Line
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                    datasets: [
                      {
                        data: revenueData,
                        label: 'Revenue',
                        fill: false,
                        borderColor: '#3f51b5',
                        tension: 0.4,
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">Total Orders</Typography>
                <Typography variant="h3">{totalOrders}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">Total Revenue</Typography>
                <Typography variant="h3">${totalRevenue}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

// Example data for testing
const exampleSalesData = {
  daily: [50, 100, 150, 200, 250, 300],
  weekly: [300, 400, 500, 600, 700, 800],
  monthly: [1500, 2000, 2500, 3000, 3500, 4000],
};

const exampleCustomerData = {
  daily: [5, 10, 15, 20, 25, 30],
  weekly: [30, 40, 50, 60, 70, 80],
  monthly: [150, 200, 250, 300, 350, 400],
};

const exampleProductCategoryData = {
  daily: [10, 20, 30, 40, 50, 60],
  weekly: [60, 80, 100, 120, 140, 160],
  monthly: [300, 400, 500, 600, 700, 800],
};

const exampleDoughnutData = {
  completed: 60,
  pending: 30,
  cancelled: 10,
};

const exampleOrderQuantityData = {
  daily: [5, 10, 15, 20, 25, 30],
  weekly: [30, 40, 50, 60, 70, 80],
  monthly: [150, 200, 250, 300, 350, 400],
};

const exampleRevenueData = {
  daily: [500, 1000, 1500, 2000, 2500, 3000],
  weekly: [3000, 4000, 5000, 6000, 7000, 8000],
  monthly: [15000, 20000, 25000, 30000, 35000, 40000],
};

const exampleTotalOrders = 12345;
const exampleTotalRevenue = 1234567;

export default Overview;
