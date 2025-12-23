import { RouteObject } from 'react-router';
import LogInPage from '../pages/LogInPage';
import ProtectedRoute from '../components/Auth/ProtectedRoute';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppLayout from '../components/Layouts/AppLayout/AppLayout';
import Dashboard from '../pages/Dashboard';
import ProfilePage from '../pages/ProfilePage';

export const routes: RouteObject[] = [
  {
    path: "/login",
    element: <LogInPage />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />

      },
      {
        element: <ProtectedRoute allowedRoles={['admin']} />,
        children: [
          {
            path: "/admin",
            element: (
              <Box sx={{ p: 3 }}>
                <Typography variant="h4" > Admin Page </Typography>
                < Typography > Only accessible by Admin.</Typography>
              </Box>
            ),
          },
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={['supervisor']} />,
        children: [
          {
            path: "/supervisor",
            element: (
              <Box sx={{ p: 3 }}>
                <Typography variant="h4" > Supervisor Page </Typography>
                < Typography > Only accessible by Supervisor.</Typography>
              </Box>
            ),
          },
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={['staff']} />,
        children: [
          {
            path: "/staff",
            element: (
              <Box sx={{ p: 3 }}>
                <Typography variant="h4" > Staff Page </Typography>
                < Typography > Only accessible by Staff.</Typography>
              </Box>
            ),
          },
        ],
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },

];
