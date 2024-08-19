import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

const EditClient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the client data by ID
    const fetchClient = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/clients/${id}`);
        const client = response.data;
        setName(client.name);
        setAddress(client.address);
        setPhoneNumber(client.phoneNumber);
        setBankAccountNumber(client.bankAccount || '');
      } catch (error) {
        console.error('There was an error fetching the client!', error);
      }
    };

    fetchClient();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedClient = {
      name,
      address,
      phoneNumber,
      bankAccount: bankAccountNumber || undefined, // Optional field
    };

    try {
      await axios.put(`http://localhost:3001/clients/${id}`, updatedClient);
      navigate('/clients'); // Redirect to clients list after successful update
    } catch (error) {
      console.error('There was an error updating the client!', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Client
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
          Update Client
        </Button>
      </Box>
    </Container>
  );
};

export default EditClient;
