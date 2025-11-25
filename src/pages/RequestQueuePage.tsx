import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import RequestList from '../components/RequestList';
import { RequestDetails, QueueResponse } from '../types';
import {
  useGetMyRequestsQuery,
  useGetManagerQueueQuery,
  useGetAssigneeQueueQuery,
} from '../store/api-slice';
import { useAppDispatch } from '../store/hooks';
import { setRequests, setPage, setLoading, setError } from '../store/request-slice';
import RequestDetailDialog from '../components/RequestDetailDialog';
import ApproveRejectDialog from '../components/ApproveRejectDialog';
import CloseRequestDialog from '../components/CloseRequestDialog';

interface RequestQueuePageProps {
  queueType: 'mine' | 'manager' | 'assignee';
}

const RequestQueuePage: React.FC<RequestQueuePageProps> = ({ queueType }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [page, setPageState] = useState(1);
  const [pageSize] = useState(10);
  const [selectedRequest, setSelectedRequest] = useState<RequestDetails | null>(null);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);
  const [actionRequest, setActionRequest] = useState<RequestDetails | null>(null);

  const mineQuery = useGetMyRequestsQuery(
    { page, count: pageSize },
    { skip: queueType !== 'mine' }
  );
  const managerQuery = useGetManagerQueueQuery(
    { page, count: pageSize },
    { skip: queueType !== 'manager' }
  );
  const assigneeQuery = useGetAssigneeQueueQuery(
    { page, count: pageSize },
    { skip: queueType !== 'assignee' }
  );

  const { data, isLoading, error, refetch } = queueType === 'mine'
    ? mineQuery
    : queueType === 'manager'
    ? managerQuery
    : assigneeQuery;

  const typedData = data as QueueResponse | undefined;

  useEffect(() => {
    if (typedData?.success && typedData.data) {
      dispatch(setRequests({ records: typedData.data.records, total: typedData.data.total }));
      dispatch(setPage(page));
    }
    dispatch(setLoading(isLoading));
    if (error) {
      dispatch(setError('Failed to load requests'));
    }
  }, [typedData, isLoading, error, dispatch, page]);

  const handlePageChange = (newPage: number) => {
    setPageState(newPage);
    dispatch(setPage(newPage));
  };

  const handleViewDetails = (request: RequestDetails) => {
    setSelectedRequest(request);
  };

  const handleApprove = (request: RequestDetails) => {
    setActionRequest(request);
    setApproveDialogOpen(true);
  };

  const handleReject = (request: RequestDetails) => {
    setActionRequest(request);
    setApproveDialogOpen(true);
  };

  const handleClose = (request: RequestDetails) => {
    setActionRequest(request);
    setCloseDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedRequest(null);
    setApproveDialogOpen(false);
    setCloseDialogOpen(false);
    setActionRequest(null);
    refetch();
  };

  const titleMap = {
    mine: 'My Requests',
    manager: 'Manager Queue',
    assignee: 'Assignee Queue',
  };

  const requests = typedData?.data?.records || [];
  const total = typedData?.data?.total || 0;

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {titleMap[queueType]}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {total} request(s) found
        </Typography>
      </Box>

      {isLoading && requests.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <RequestList
          requests={requests}
          total={total}
          currentPage={page}
          pageSize={pageSize}
          loading={isLoading}
          error={error ? 'Failed to load requests' : null}
          onPageChange={handlePageChange}
          onViewDetails={handleViewDetails}
          showActions={queueType === 'manager' || queueType === 'assignee'}
          onApprove={queueType === 'manager' ? handleApprove : undefined}
          onReject={queueType === 'manager' ? handleReject : undefined}
          onClose={queueType === 'assignee' ? handleClose : undefined}
        />
      )}

      {selectedRequest && (
        <RequestDetailDialog
          request={selectedRequest}
          open={!!selectedRequest}
          onClose={handleDialogClose}
        />
      )}

      {actionRequest && queueType === 'manager' && (
        <ApproveRejectDialog
          request={actionRequest}
          open={approveDialogOpen}
          onClose={handleDialogClose}
          initialAction={null}
        />
      )}

      {actionRequest && queueType === 'assignee' && (
        <CloseRequestDialog
          request={actionRequest}
          open={closeDialogOpen}
          onClose={handleDialogClose}
        />
      )}
    </Container>
  );
};

export default RequestQueuePage;

