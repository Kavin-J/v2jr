import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import type { } from '@mui/material/themeCssVarsAugmentation';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { logout } from '../../../app/features/auth/auth.slice';
import { matchPath, useLocation } from 'react-router';
import AppSidebarContext from '../../../context/AppSidebarContext';
import { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from '../../../constants';
import AppSidebarPageItem from './AppSidebarPageItem';
import AppSidebarHeaderItem from './AppSidebarHeaderItem';
import AppSidebarDividerItem from './AppSidebarDividerItem';
import {
  getDrawerSxTransitionMixin,
  getDrawerWidthTransitionMixin,
} from '../../../mixins';
import { selectAuthRole } from '../../../app/features/auth/auth.selectors';

export interface AppSidebarProps {
  expanded?: boolean;
  setExpanded: (expanded: boolean) => void;
  disableCollapsibleSidebar?: boolean;
  container?: Element;
}

export default function AppSidebar({
  expanded = true,
  setExpanded,
  disableCollapsibleSidebar = false,
  container,
}: AppSidebarProps) {
  const theme = useTheme();
  const role = useAppSelector(selectAuthRole)
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const handleLogout = React.useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const [expandedItemIds, setExpandedItemIds] = React.useState<string[]>([]);

  const isOverSmViewport = useMediaQuery(theme.breakpoints.up('sm'));
  const isOverMdViewport = useMediaQuery(theme.breakpoints.up('md'));

  const [isFullyExpanded, setIsFullyExpanded] = React.useState(expanded);
  const [isFullyCollapsed, setIsFullyCollapsed] = React.useState(!expanded);

  React.useEffect(() => {
    if (expanded) {
      const drawerWidthTransitionTimeout = setTimeout(() => {
        setIsFullyExpanded(true);
      }, theme.transitions.duration.enteringScreen);

      return () => clearTimeout(drawerWidthTransitionTimeout);
    }

    setIsFullyExpanded(false);

    return () => { };
  }, [expanded, theme.transitions.duration.enteringScreen]);

  React.useEffect(() => {
    if (!expanded) {
      const drawerWidthTransitionTimeout = setTimeout(() => {
        setIsFullyCollapsed(true);
      }, theme.transitions.duration.leavingScreen);

      return () => clearTimeout(drawerWidthTransitionTimeout);
    }

    setIsFullyCollapsed(false);

    return () => { };
  }, [expanded, theme.transitions.duration.leavingScreen]);

  const mini = !disableCollapsibleSidebar && !expanded;

  const handleSetSidebarExpanded = React.useCallback(
    (newExpanded: boolean) => () => {
      setExpanded(newExpanded);
    },
    [setExpanded],
  );

  const handlePageItemClick = React.useCallback(
    (itemId: string, hasNestedNavigation: boolean) => {
      if (hasNestedNavigation && !mini) {
        setExpandedItemIds((previousValue) =>
          previousValue.includes(itemId)
            ? previousValue.filter(
              (previousValueItemId) => previousValueItemId !== itemId,
            )
            : [...previousValue, itemId],
        );
      } else if (!isOverSmViewport && !hasNestedNavigation) {
        setExpanded(false);
      }
    },
    [mini, setExpanded, isOverSmViewport],
  );

  const hasDrawerTransitions =
    isOverSmViewport && (!disableCollapsibleSidebar || isOverMdViewport);

  const getDrawerContent = React.useCallback(
    (viewport: 'phone' | 'tablet' | 'desktop') => (
      <React.Fragment>
        <Toolbar />
        <Box
          component="nav"
          aria-label={`${viewport.charAt(0).toUpperCase()}${viewport.slice(1)}`}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'auto',
            scrollbarGutter: mini ? 'stable' : 'auto',
            overflowX: 'hidden',
            pt: !mini ? 0 : 2,
            ...(hasDrawerTransitions
              ? getDrawerSxTransitionMixin(isFullyExpanded, 'padding')
              : {}),
          }}
        >
          <List
            dense
            sx={{
              padding: mini ? 0 : 0.5,
              mb: 4,
              width: mini ? MINI_DRAWER_WIDTH : 'auto',
            }}
          >
            <AppSidebarHeaderItem>Menu</AppSidebarHeaderItem>
            <AppSidebarPageItem
              id="dashboard"
              title="Dashboard"
              icon={<HomeIcon />}
              href="/"
              selected={!!matchPath('/', pathname)}
            />
            <AppSidebarDividerItem />
            <AppSidebarHeaderItem>{role === "admin" ? "Admin" : role === "supervisor" ? "Supervisor" : "Staff"}</AppSidebarHeaderItem>
            <AppSidebarPageItem
              id={role === "admin" ? "admin" : role === "supervisor" ? "supervisor" : "staff"}
              title={role === "admin" ? "Admin" : role === "supervisor" ? "Supervisor" : "Staff"}
              icon={<BarChartIcon />}
              href={role === "admin" ? "/admin" : role === "supervisor" ? "/supervisor" : "/staff"}
              selected={!!matchPath('/' + role, pathname)}
            // defaultExpanded={!!matchPath('/' + role, pathname)}
            // expanded={expandedItemIds.includes(role)}
            // nestedNavigation={
            //   <List
            //     dense
            //     sx={{
            //       padding: 0,
            //       my: 1,
            //       pl: mini ? 0 : 1,
            //       minWidth: 240,
            //     }}
            //   >
            //     <AppSidebarPageItem
            //       id="sales"
            //       title="Sales"
            //       icon={<DescriptionIcon />}
            //       href="/reports/sales"
            //       selected={!!matchPath('/reports/sales', pathname)}
            //     />
            //     <AppSidebarPageItem
            //       id="traffic"
            //       title="Traffic"
            //       icon={<DescriptionIcon />}
            //       href="/reports/traffic"
            //       selected={!!matchPath('/reports/traffic', pathname)}
            //     />
            //   </List>
            // }
            />
            <AppSidebarPageItem
              id="reports"
              title="Reports"
              icon={<LayersIcon />}
              href="/reports"
              selected={!!matchPath('/reports', pathname)}
            />
          </List>
          <List
            dense
            sx={{
              padding: mini ? 0 : 0.5,
              width: mini ? MINI_DRAWER_WIDTH : 'auto',
            }}
          >
            <ListItem
              disablePadding
              sx={{
                display: 'block',
                py: 0,
                px: 1,
                overflowX: 'hidden',
              }}
            >
              <ListItemButton
                data-testid="logout-button"
                aria-label="Logout"
                aria-controls="logout-menu"
                onClick={handleLogout}
                sx={{
                  height: mini ? 50 : 'auto',
                  justifyContent: mini ? 'center' : 'initial',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: mini ? 'auto' : 3,
                    justifyContent: 'center',
                  }}
                >
                  <LogoutIcon />
                </ListItemIcon>
                {!mini && <ListItemText primary="Logout" />}
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </React.Fragment>
    ),
    [mini, hasDrawerTransitions, isFullyExpanded, expandedItemIds, pathname],
  );

  const getDrawerSharedSx = React.useCallback(
    (isTemporary: boolean) => {
      const drawerWidth = mini ? MINI_DRAWER_WIDTH : DRAWER_WIDTH;

      return {
        displayPrint: 'none',
        width: drawerWidth,
        flexShrink: 0,
        ...getDrawerWidthTransitionMixin(expanded),
        ...(isTemporary ? { position: 'absolute' } : {}),
        [`& .MuiDrawer-paper`]: {
          position: 'absolute',
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundImage: 'none',
          ...getDrawerWidthTransitionMixin(expanded),
        },
      };
    },
    [expanded, mini],
  );

  const sidebarContextValue = React.useMemo(() => {
    return {
      onPageItemClick: handlePageItemClick,
      mini,
      fullyExpanded: isFullyExpanded,
      fullyCollapsed: isFullyCollapsed,
      hasDrawerTransitions,
    };
  }, [
    handlePageItemClick,
    mini,
    isFullyExpanded,
    isFullyCollapsed,
    hasDrawerTransitions,
  ]);

  return (
    <AppSidebarContext.Provider value={sidebarContextValue}>
      <Drawer
        container={container}
        variant="temporary"
        open={expanded}
        onClose={handleSetSidebarExpanded(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: {
            xs: 'block',
            sm: disableCollapsibleSidebar ? 'block' : 'none',
            md: 'none',
          },
          ...getDrawerSharedSx(true),
        }}
      >
        {getDrawerContent('phone')}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: 'none',
            sm: disableCollapsibleSidebar ? 'none' : 'block',
            md: 'none',
          },
          ...getDrawerSharedSx(false),
        }}
      >
        {getDrawerContent('tablet')}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          ...getDrawerSharedSx(false),
        }}
      >
        {getDrawerContent('desktop')}
      </Drawer>
    </AppSidebarContext.Provider>
  );
}
