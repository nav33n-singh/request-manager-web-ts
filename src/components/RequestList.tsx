import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Typography,
  Box,
  Pagination,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { RequestDetails, RequestStatus } from '../types';
import { formatDate, formatUserName, getStatusColor } from '../utils/format';

interface RequestListProps {
  requests: RequestDetails[];
  total: number;
  currentPage: number;
  pageSize: number;
  loading: boolean;
  error: string | null;
  onPageChange: (page: number) => void;
  onViewDetails: (request: RequestDetails) => void;
  showActions?: boolean;
  onApprove?: (request: RequestDetails) => void;
  onReject?: (request: RequestDetails) => void;
  onClose?: (request: RequestDetails) => void;
}

const RequestList: React.FC<RequestListProps> = ({
  requests,
  total,
  currentPage,
  pageSize,
  loading,
  error,
  onPageChange,
  onViewDetails,
  showActions = false,
  onApprove,
  onReject,
  onClose,
}) => {
  const totalPages = Math.ceil(total / pageSize);

  if (loading && requests.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (requests.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        No requests found.
      </Alert>
    );
  }

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Request</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Requestor</TableCell>
              <TableCell>Assignee</TableCell>
              <TableCell>Approver</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.requestID} hover>
                <TableCell>{request.requestID}</TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      maxWidth: 300,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {request.request}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={request.status}
                    color={getStatusColor(request.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{formatUserName(request.requestor)}</TableCell>
                <TableCell>{formatUserName(request.assignee)}</TableCell>
                <TableCell>
                  {request.approver ? formatUserName(request.approver) : 'N/A'}
                </TableCell>
                <TableCell>{formatDate(request.createdAt)}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => onViewDetails(request)}
                      color="primary"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    {showActions && request.status === 'PendingApproval' && onApprove && onReject && (
                      <>
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          onClick={() => onApprove(request)}
                        >
                          Approve
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={() => onReject(request)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {showActions && request.status === 'Approved' && onClose && (
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => onClose(request)}
                      >
                        Close
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => onPageChange(page)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default RequestList;

