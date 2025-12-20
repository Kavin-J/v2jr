import CssBaseline from '@mui/material/CssBaseline';
import { createBrowserRouter, RouterProvider } from 'react-router';
import NotificationsProvider from './hooks/useNotifications/NotificationsProvider';
import DialogsProvider from './hooks/useDialogs/DialogsProvider';
import AppTheme from './theme/AppTheme';
import {
  dataGridCustomizations,
  datePickersCustomizations,
  sidebarCustomizations,
  formInputCustomizations,
} from './theme/customizations';
import LogInPage from './pages/LogInPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppLayout from './components/Layouts/AppLayout/AppLayout';
export const routerConfig = [
  {
    path: "/login",
    element: <LogInPage />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4">Dashboard (All Authenticated Users)</Typography>
          </Box>
        ),
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={['admin']} />,
    children: [
      {
        path: "/admin",
        element: (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4">Admin Page</Typography>
            <Typography>Only accessible by Admin.</Typography>
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
            <Typography variant="h4">Supervisor Page</Typography>
            <Typography>Only accessible by Supervisor.</Typography>
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
            <Typography variant="h4">Staff Page</Typography>
            <Typography>Only accessible by Staff.</Typography>
          </Box>
        ),
      },
    ],
  },
]
const router = createBrowserRouter(routerConfig);

const themeComponents = {
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...sidebarCustomizations,
  ...formInputCustomizations,
};

export default function App(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props} themeComponents={themeComponents}>
      <CssBaseline enableColorScheme />
      <NotificationsProvider>
        <DialogsProvider>
          <RouterProvider router={router} />
        </DialogsProvider>
      </NotificationsProvider>
    </AppTheme>
  );
}
