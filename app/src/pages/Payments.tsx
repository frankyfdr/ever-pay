// src/pages/Payments.tsx
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
import ConfirmPaymentModal from '../Components/ConfirmPaymentModal';

const Payments: React.FC = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<
    | {
        recipientName: string;
        amount: number;
        id: number;
      }
    | undefined
  >();

  useEffect(() => {
    // Fetch payments data
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/payments');
        setPayments(response.data);
      } catch (error) {
        console.error('There was an error fetching the payments!', error);
      }
    };

    fetchPayments();
  }, []);

  const handleConfirm = (paymentId: string | number) => {
    const payment = payments.find((payment) => payment.id === paymentId);
    if (payment) {
      setSelectedPayment(payment);
      setIsModalOpen(true);
    }
  };
  const handleStatusChange = async (paymentId: string | number) => {
    try {
      await axios.patch(`http://localhost:3001/payments/${paymentId}`, {
        status: 'Approved',
      });
      setPayments(
        payments.map((payment) =>
          payment.id === paymentId
            ? { ...payment, status: 'Approved' }
            : payment
        )
      );
    } catch (error) {
      console.error('There was an error updating the payment status!', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Payments
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Client Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Recipient Name</TableCell>
              <TableCell>Bank Name</TableCell>
              <TableCell>Account Number</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.client?.name}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{payment.recipientName}</TableCell>
                <TableCell>{payment.recipientBankName}</TableCell>
                <TableCell>{payment.recipientAccountNumber}</TableCell>
                <TableCell>{payment.notes}</TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell>
                  {payment.status.toLowerCase() === 'pending' && (
                    <Button
                      variant="contained"
                      onClick={() => handleConfirm(payment.id)}
                      sx={{
                        mt: 3,
                        bgcolor: '#49ab81',
                        borderRadius: 2,
                        ':hover': {
                          bgcolor: '#317256',
                        },
                      }}
                    >
                      Approve
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedPayment && (
        <ConfirmPaymentModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleStatusChange}
          paymentAmount={selectedPayment.amount}
          recipientName={selectedPayment.recipientName}
          paymentId={selectedPayment.id}
        />
      )}
    </Container>
  );
};

export default Payments;
