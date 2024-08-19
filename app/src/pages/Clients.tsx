import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Clients: React.FC = () => {
  const [clients, setClients] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleEditClient = (clientId: string) => {
    navigate(`/clients/edit/${clientId}`);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Clients
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Bank Account Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.address}</TableCell>
                <TableCell>{client.phoneNumber}</TableCell>
                <TableCell>{client.bankAccount || 'N/A'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleEditClient(client.id)}
                    sx={{
                      mt: 3,
                      bgcolor: '#49ab81',
                      borderRadius: 2,
                      ':hover': {
                        bgcolor: '#317256',
                      },
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Clients;
