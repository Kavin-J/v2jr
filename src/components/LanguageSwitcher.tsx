import * as React from 'react';
import TranslateIcon from '@mui/icons-material/Translate';
import IconButton, { IconButtonOwnProps } from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthLanguage } from '../app/features/auth/auth.selectors';
import { setLanguage } from '../app/features/auth/auth.slice';
import { LanguageType } from '../app/features/auth/auth.type';

export default function LanguageSwitcher(props: IconButtonOwnProps) {
    const dispatch = useDispatch();
    const currentLanguage = useSelector(selectAuthLanguage);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageChange = (lang: LanguageType) => () => {
        dispatch(setLanguage(lang));
        handleClose();
    };

    return (
        <React.Fragment>
            <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'language-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                data-testid="language-selector"
                {...props}
            >
                <TranslateIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="language-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        variant: 'outlined',
                        elevation: 0,
                        sx: {
                            my: '4px',
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem
                    selected={currentLanguage === 'th'}
                    onClick={handleLanguageChange('th')}
                >
                    ไทย
                </MenuItem>
                <MenuItem
                    selected={currentLanguage === 'en'}
                    onClick={handleLanguageChange('en')}
                >
                    English
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
