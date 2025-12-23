import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { selectAuthUser } from '../../../app/features/auth/auth.selectors';
import { logout } from '../../../app/features/auth/auth.slice';
import { useNavigate } from 'react-router';

interface AppSidebarProfileProps {
    mini: boolean;
}

export default function AppSidebarProfile({ mini }: AppSidebarProfileProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectAuthUser);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        navigate('/profile');
        handleClose();
    };

    const handleLogout = () => {
        dispatch(logout());
        handleClose();
    };

    return (
        <Box
            sx={{
                p: mini ? 1 : 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: mini ? 'center' : 'flex-start',
                borderTop: '1px solid',
                borderColor: 'divider',
                mt: 'auto',
            }}
        >
            <Tooltip title={mini ? (user?.name || 'User') : ''} placement="right">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{
                        p: 0,
                        ...(mini && {
                            width: 40,
                            height: 40,
                        }),
                    }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar
                        alt={user?.name}
                        src={user?.avatar}
                        sx={{ width: 40, height: 40 }}
                    />
                </IconButton>
            </Tooltip>

            {!mini && (
                <Box sx={{ ml: 2, overflow: 'hidden', cursor: 'pointer' }} onClick={handleClick}>
                    <Typography variant="subtitle2" noWrap sx={{ fontWeight: 'bold' }}>
                        {user?.name}
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary" noWrap sx={{ textTransform: 'capitalize' }}>
                        {user?.role}
                    </Typography>
                </Box>
            )}

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: -1.5,
                            ml: 1,
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                bottom: -10,
                                left: 17,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
            >
                <MenuItem onClick={handleProfileClick}>
                    <ListItemIcon>
                        <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
}
