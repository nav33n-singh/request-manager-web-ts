import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider,
  Grid,
} from '@mui/material';
import { RequestDetails } from '../types';
import { formatDate, formatUserName, getStatusColor } from '../utils/format';

interface RequestDetailDialogProps {
  request: RequestDetails;
  open: boolean;
  onClose: () => void;
}

const RequestDetailDialog: React.FC<RequestDetailDialogProps> = ({
  request,
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Request Details</Typography>
          <Chip
            label={request.status}
            color={getStatusColor(request.status)}
            size="small"
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Request ID
          </Typography>
          <Typography variant="body1" gutterBottom>
            #{request.requestID}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Request Description
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, whiteSpace: 'pre-wrap' }}>
            {request.request}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Requestor
              </Typography>
              <Typography variant="body1">
                {formatUserName(request.requestor)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {request.requestor.email}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Assignee
              </Typography>
              <Typography variant="body1">
                {formatUserName(request.assignee)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {request.assignee.email}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Approver
              </Typography>
              {request.approver ? (
                <>
                  <Typography variant="body1">
                    {formatUserName(request.approver)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {request.approver.email}
                  </Typography>
                </>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  Not assigned
                </Typography>
              )}
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Created At
              </Typography>
              <Typography variant="body1">
                {formatDate(request.createdAt)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Last Updated
              </Typography>
              <Typography variant="body1">
                {formatDate(request.updatedAt)}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestDetailDialog;

