import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { RequestDetails } from '../types';
import { useCloseRequestMutation } from '../store/api-slice';

interface CloseRequestDialogProps {
  request: RequestDetails;
  open: boolean;
  onClose: () => void;
}

const CloseRequestDialog: React.FC<CloseRequestDialogProps> = ({
  request,
  open,
  onClose,
}) => {
  const [closeRequest, { isLoading }] = useCloseRequestMutation();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);

    try {
      await closeRequest({
        requestId: request.requestID,
      }).unwrap();
      
      handleClose();
    } catch (err: any) {
      setError(err?.data?.message || 'Failed to close request. Please try again.');
    }
  };

  const handleClose = () => {
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Close Request</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Request ID: #{request.requestID}
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, whiteSpace: 'pre-wrap' }}>
            {request.request}
          </Typography>

          <Alert severity="info" sx={{ mb: 2 }}>
            Are you sure you want to close this request? This action cannot be undone.
          </Alert>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Close Request'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CloseRequestDialog;

