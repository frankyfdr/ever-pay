import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import axios from 'axios';

const CreatePayment: React.FC = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [clientId, setClientId] = useState('');
  const [amount, setAmount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientBankName, setRecipientBankName] = useState('');
  const [recipientAccountNumber, setRecipientAccountNumber] = useState('');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch clients to populate the dropdown
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:3001/clients');
        setClients(response.data);
      } catch (error) {
        console.error('There was an error fetching the clients!', error);
      }
    };

    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPayment = {
      client: clientId,
      amount: parseFloat(amount), // Ensure amount is a number
      recipientName,
      recipientBankName,
      recipientAccountNumber,
      notes: notes || undefined, // Optional field
    };

    try {
      await axios.post('http://localhost:3001/payments', newPayment);
      navigate('/payments'); // Redirect to payments list after successful creation
    } catch (error) {
      console.error('There was an error creating the payment!', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Create Payment
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <FormControl fullWidth required margin="normal">
          <InputLabel id="client-select-label">Client</InputLabel>
          <Select
            labelId="client-select-label"
            value={clientId}
            onChange={(e) => setClientId(e.target.value as string)}
          >
            {clients.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {client.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          required
          margin="normal"
          type="number"
          inputProps={{ min: '0', step: '0.01' }}
        />
        <TextField
          label="Recipient's Name"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Recipient's Bank Name"
          value={recipientBankName}
          onChange={(e) => setRecipientBankName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Recipient's Account Number"
          value={recipientAccountNumber}
          onChange={(e) => setRecipientAccountNumber(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
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
          Create Payment
        </Button>
      </Box>
    </Container>
  );
};

export default CreatePayment;
