import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Create Request',
      description: 'Create a new request',
      icon: <AddCircleIcon sx={{ fontSize: 48 }} />,
      path: '/requests/create',
      color: 'primary',
    },
    {
      title: 'My Requests',
      description: 'View requests created by me',
      icon: <PersonIcon sx={{ fontSize: 48 }} />,
      path: '/requests/mine',
      color: 'info',
    },
    {
      title: 'Manager Queue',
      description: 'Approve or reject pending requests',
      icon: <CheckCircleIcon sx={{ fontSize: 48 }} />,
      path: '/requests/manager',
      color: 'warning',
    },
    {
      title: 'Assignee Queue',
      description: 'View requests assigned to me',
      icon: <AssignmentIcon sx={{ fontSize: 48 }} />,
      path: '/requests/assignee',
      color: 'success',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to the Request Management System
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {quickActions.map((action) => (
          <Grid item xs={12} sm={6} md={3} key={action.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
              onClick={() => navigate(action.path)}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ color: `${action.color}.main`, mb: 2 }}>
                  {action.icon}
                </Box>
                <Typography variant="h6" component="h2" gutterBottom>
                  {action.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {action.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DashboardPage;

