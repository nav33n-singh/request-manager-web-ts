import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Alert,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from '@mui/material';
import { RequestDetails } from '../types';
import { useApproveRequestMutation } from '../store/api-slice';

interface ApproveRejectDialogProps {
  request: RequestDetails;
  open: boolean;
  onClose: () => void;
  initialAction?: 'Approved' | 'Rejected' | null;
}

const ApproveRejectDialog: React.FC<ApproveRejectDialogProps> = ({
  request,
  open,
  onClose,
  initialAction = null,
}) => {
  const [approveRequest, { isLoading }] = useApproveRequestMutation();
  const [action, setAction] = useState<'Approved' | 'Rejected'>(initialAction || 'Approved');
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);

    try {
      await approveRequest({
        requestId: request.requestID,
        action,
        comment: comment.trim() || null,
      }).unwrap();
      
      handleClose();
    } catch (err: any) {
      setError(err?.data?.message || 'Failed to process request. Please try again.');
    }
  };

  const handleClose = () => {
    setComment('');
    setError(null);
    setAction('Approved');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialAction === 'Approved' ? 'Approve Request' : initialAction === 'Rejected' ? 'Reject Request' : 'Approve/Reject Request'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Request ID: #{request.requestID}
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, whiteSpace: 'pre-wrap' }}>
            {request.request}
          </Typography>

          {!initialAction && (
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Action</FormLabel>
              <RadioGroup
                value={action}
                onChange={(e) => setAction(e.target.value as 'Approved' | 'Rejected')}
              >
                <FormControlLabel value="Approved" control={<Radio />} label="Approve" />
                <FormControlLabel value="Rejected" control={<Radio />} label="Reject" />
              </RadioGroup>
            </FormControl>
          )}

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Comment (Optional)"
            placeholder="Enter a comment for this action"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isLoading}
            sx={{ mb: 2 }}
          />

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
          color={action === 'Approved' ? 'success' : 'error'}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : action === 'Approved' ? 'Approve' : 'Reject'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApproveRejectDialog;

