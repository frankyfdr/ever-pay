import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

interface ConfirmPaymentModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (paymentId: string | number) => void;
  paymentAmount: number;
  recipientName: string;
  paymentId: string | number;
}

const ConfirmPaymentModal: React.FC<ConfirmPaymentModalProps> = ({
  open,
  onClose,
  onConfirm,
  paymentAmount,
  recipientName,
  paymentId,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: '#8fb6ab',
          borderRadius: 5,
          color: 'white',
        },
      }}
    >
      <DialogTitle fontWeight={'bold'}>Confirm Payment</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to confirm the payment of ${paymentAmount} to{' '}
          {recipientName}?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            color: '#d15555',
            ':hover': { bgcolor: '#ce8484', color: 'white' },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm(paymentId);
            onClose();
          }}
          sx={{
            color: '#317256',

            ':hover': {
              bgcolor: '#317256',
              color: 'white',
            },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmPaymentModal;
