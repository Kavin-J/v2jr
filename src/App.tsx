import CssBaseline from '@mui/material/CssBaseline';
import { routes } from './routes/router';
import { createBrowserRouter, RouterProvider } from 'react-router';
import NotificationsProvider from './hooks/useNotifications/NotificationsProvider';
import DialogsProvider from './hooks/useDialogs/DialogsProvider';
import AppTheme from './theme/AppTheme';
import PermissionProvider from './hooks/usePermission/PermissionProvider';
import {
  dataGridCustomizations,
  datePickersCustomizations,
  sidebarCustomizations,
  formInputCustomizations,
} from './theme/customizations';


const router = createBrowserRouter(routes);

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
      <PermissionProvider>
        <NotificationsProvider>
          <DialogsProvider>
            <RouterProvider router={router} />
          </DialogsProvider>
        </NotificationsProvider>
      </PermissionProvider>
    </AppTheme>
  );
}
