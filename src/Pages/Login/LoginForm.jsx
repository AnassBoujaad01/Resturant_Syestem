import React, { useState } from 'react';
import { Input, Select, IconButton, Button, FormControl, InputLabel, InputAdornment, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import KeyboardNumber from '../../Components/KeyboardNumber';
import { Link } from 'react-router-dom';

function LoginForm({ onBackspaceClick, onNumberClick, onUpdatedClick, inputValue }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleLogin = () => {
    // Add your login logic here
    console.log('Login button clicked');
  };

  return (
    <div className='p-8'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>
      <div className='space-y-5'>
        <FormControl className='w-full'>
          <InputLabel htmlFor='user-select' className='text-gray-700 text-lg'>User</InputLabel>
          <Select
            id='user-select'
            className='bg-white p-1 rounded-md'
            options={[]}
            value={''}
          />
        </FormControl>
        <FormControl className='w-full'>
          <InputLabel htmlFor='password-input' className='text-gray-700 text-lg'>Password</InputLabel>
          <Input
            id='password-input'
            className='bg-transparent p-2 rounded-md'
            type={showPassword ? 'text' : 'password'}
            value={inputValue}
            inputProps={{ inputMode: 'numeric' }}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={togglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <KeyboardNumber 
          onNumberClick={onNumberClick}
          onBackspaceClick={onBackspaceClick}
          onUpdatedClick={onUpdatedClick}
        />
        <Typography variant='body2' color='textSecondary' align='center'>
          Note: Use numeric keyboard for password input.
        </Typography>
        <Button variant='contained' color='primary' fullWidth component={Link} to='/CaissePage' onClick={handleLogin}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
