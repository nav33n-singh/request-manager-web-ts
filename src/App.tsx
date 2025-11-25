import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './components/AppLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CreateRequestPage from './pages/CreateRequestPage';
import RequestQueuePage from './pages/RequestQueuePage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <DashboardPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/requests/create"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <CreateRequestPage />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/requests/mine"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <RequestQueuePage queueType="mine" />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/requests/manager"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <RequestQueuePage queueType="manager" />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/requests/assignee"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <RequestQueuePage queueType="assignee" />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

