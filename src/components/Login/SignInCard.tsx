import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { SitemarkIcon } from './CustomIcons';
import SecurityIcon from '@mui/icons-material/Security';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { loginCredentials } from '../../app/features/auth/auth.thunks';
import { selectAuthError, selectAuthLanguage } from '../../app/features/auth/auth.selectors';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function SignInCard() {
  const dispatch = useAppDispatch();

  const language = useAppSelector(selectAuthLanguage)
  const error = useAppSelector(selectAuthError)

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [responseError, setResponseError] = React.useState('');
  const signInText = language === 'en' ? 'Sign In' : 'เข้าสู่ระบบ';
  const emailLabel = language === 'en' ? 'Email' : 'อีเมล';
  const passwordLabel = language === 'en' ? 'Password' : 'รหัสผ่าน';
  const placeholderEmail = language === 'en' ? 'your@email.com' : 'อีเมลของคุณ';
  const placeholderPassword = language === 'en' ? '••••••' : 'รหัสผ่านของคุณ';
  const errorText = language === 'en' ? 'Invalid email or password' : 'อีเมลหรือรหัสผ่านไม่ถูกต้อง';
  const emailErrorText = language === 'en' ? 'Please enter a valid email address' : 'กรุณากรอกอีเมลให้ถูกต้อง';
  const passwordErrorText = language === 'en' ? 'Password must be at least 6 characters long' : 'รหัสผ่านต้องมีความยาวไม่ต่ำกว่า 6 ตัวอักษร';


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (emailError || passwordError) {
      event.preventDefault();
      setResponseError('');
      return;
    }
    event.preventDefault();
    setResponseError('');
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    dispatch(loginCredentials({ email: data.get('email') as string, password: data.get('password') as string }));
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage(emailErrorText);
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage(passwordErrorText);
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };
  const handleAdminLogin = () => {
    dispatch(loginCredentials({ email: 'test_admin@example.com', password: 'test123' }));
  };
  const handleSupervisorLogin = () => {
    dispatch(loginCredentials({ email: 'test_supervisor@example.com', password: 'test123' }));
  };
  const handleStaffLogin = () => {
    dispatch(loginCredentials({ email: 'test_staff@example.com', password: 'test123' }));
  };

  React.useEffect(
    () => {
      if (error) {
        setResponseError(errorText)
      }
    },
    [error]
  )
  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        {signInText}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">{emailLabel}</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder={placeholderEmail}
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel htmlFor="password">{passwordLabel}</FormLabel>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder={placeholderPassword}
            type="password"
            id="password"
            autoComplete="off"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>
        <Box>
          <Typography variant="caption" color="error">{responseError}</Typography>
        </Box>
        <Button role="button" name="signIn" type="submit" fullWidth variant="contained" onClick={validateInputs}>
          {signInText}
        </Button>

      </Box>
      {import.meta.env.DEV && (
        <React.Fragment>
          <Divider>หรือ</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* mock login rbac */}
            <Button
              fullWidth
              variant="outlined"
              onClick={handleAdminLogin}
              startIcon={<SecurityIcon />}
            >
              {language === 'en' ? 'Sign In with Admin' : 'เข้าสู่ระบบด้วย Admin'}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleSupervisorLogin}
              startIcon={<SupervisorAccountIcon />}
            >
              {language === 'en' ? 'Sign In with Supervisor' : 'เข้าสู่ระบบด้วย Supervisor'}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleStaffLogin}
              startIcon={<PersonIcon />}
            >
              {language === 'en' ? 'Sign In with Staff' : 'เข้าสู่ระบบด้วย Staff'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Card>
  );
}
