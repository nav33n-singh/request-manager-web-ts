import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { useLoginMutation } from '../store/api-slice';
import { useAppDispatch } from '../store/hooks';
import { setCredentials } from '../store/auth-slice';
import { AuthenticatedUser, LoginResponse } from '../types';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    // Decode token to get user info (simplified - in production, decode JWT properly)
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/requests/mine');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    try {
      const result = await login({ userName: userName.trim(), password: password.trim() }).unwrap() as LoginResponse;
      
      if (result.success && result.data.token) {
        // Decode JWT to get user info (simplified - you should use a JWT library)
        // For now, we'll extract basic info from token or make an API call
        // Assuming token contains user info or we need to decode it
        const tokenParts = result.data.token.split('.');
        if (tokenParts.length === 3) {
          try {
            const payload = JSON.parse(atob(tokenParts[1]));
            const user: AuthenticatedUser = {
              id: payload.id || 0,
              email: payload.email || '',
              userName: payload.userName || userName,
              mobileNo: payload.mobileNo || null,
              phoneCode: payload.phoneCode || null,
            };
            dispatch(setCredentials({ token: result.data.token, user }));
            navigate('/requests/mine');
          } catch (err) {
            // Fallback if token decode fails
            const user: AuthenticatedUser = {
              id: 0,
              email: '',
              userName: userName,
              mobileNo: null,
              phoneCode: null,
            };
            dispatch(setCredentials({ token: result.data.token, user }));
            navigate('/requests/mine');
          }
        }
      }
    } catch (err: any) {
      setLoginError(err?.data?.message || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Request Manager
          </Typography>
          <Typography component="h2" variant="h6" align="center" color="text.secondary" gutterBottom>
            Sign In
          </Typography>
          
          {loginError && (
            <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
              {loginError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Username"
              name="userName"
              autoComplete="username"
              autoFocus
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={isLoading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;

