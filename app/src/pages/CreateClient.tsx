import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

const CreateClient: React.FC = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newClient = {
      name,
      address,
      phoneNumber,
      bankAccount: bankAccountNumber || undefined,
    };

    try {
      await axios.post('http://localhost:3001/clients', newClient);
      navigate('/clients');
    } catch (error) {
      console.error('There was an error creating the client!', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Create Client
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Bank Account Number"
          value={bankAccountNumber}
          onChange={(e) => setBankAccountNumber(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            mt: 3,
            bgcolor: '#8fb6ab',
            borderRadius: 2,
            ':hover': {
              bgcolor: '#317256',
            },
          }}
        >
          Create Client
        </Button>
      </Box>
    </Container>
  );
};

export default CreateClient;
