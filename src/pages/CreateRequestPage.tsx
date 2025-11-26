import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import { useCreateRequestMutation, useGetAssigneesQuery } from '../store/api-slice';
import { formatUserName } from '../utils/format';
import { AssigneeResponse, AssigneeUserMeta } from '../types';

const CreateRequestPage: React.FC = () => {
  const navigate = useNavigate();
  const [createRequest, { isLoading }] = useCreateRequestMutation();
  const { data: assigneesData, isLoading: isLoadingAssignees, error: assigneesError } = useGetAssigneesQuery({ page: 1, count: 100 });
  
  const [request, setRequest] = useState('');
  const [assigneeId, setAssigneeId] = useState<number | ''>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const typedAssigneesData = assigneesData as AssigneeResponse | undefined;
  const assignees = typedAssigneesData?.data || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccess(false);

    if (!request.trim() || request.trim().length < 3) {
      setErrorMessage('Request must be at least 3 characters long');
      return;
    }

    if (!assigneeId || assigneeId <= 0) {
      setErrorMessage('Please select an assignee');
      return;
    }

    try {
      await createRequest({
        request: request.trim(),
        assigneeId: assigneeId as number,
      }).unwrap();
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/requests/mine');
      }, 1500);
    } catch (err: any) {
      setErrorMessage(err?.data?.message || 'Failed to create request. Please try again.');
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Request
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Request created successfully! Redirecting...
          </Alert>
        )}

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Request Description"
            placeholder="Enter your request details (minimum 3 characters, maximum 2000 characters)"
            value={request}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 2000) {
                setRequest(value);
              }
            }}
            required
            helperText={`${request.length}/2000 characters`}
            disabled={isLoading || success}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            select
            label="Assignee"
            value={assigneeId}
            onChange={(e) => setAssigneeId(Number(e.target.value))}
            required
            disabled={isLoading || success || isLoadingAssignees}
            sx={{ mb: 3 }}
            helperText={isLoadingAssignees ? 'Loading assignees...' : assigneesError ? 'Failed to load assignees' : ''}
            error={!!assigneesError}
          >
            {isLoadingAssignees ? (
              <MenuItem disabled>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Loading assignees...
              </MenuItem>
            ) : assignees.length === 0 ? (
              <MenuItem disabled>No assignees available</MenuItem>
            ) : (
              assignees.map((assignee: AssigneeUserMeta) => {
                const assigneeId = Number(assignee.id);
                const userMeta = {
                  id: assigneeId,
                  firstName: assignee.firstName,
                  middleName: assignee.middleName,
                  lastName: assignee.lastName,
                  email: assignee.email,
                };
                return (
                  <MenuItem key={assignee.id} value={assigneeId}>
                    {formatUserName(userMeta)} ({assignee.email})
                  </MenuItem>
                );
              })
            )}
          </TextField>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/requests/mine')}
              disabled={isLoading || success}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading || success}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Create Request'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateRequestPage;

