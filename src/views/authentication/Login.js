import React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Checkbox,
  Grid,
  useMediaQuery,
  Snackbar,
  SnackbarContent,
  Slide,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/auth/AuthSlice';
import ErrorIcon from '@mui/icons-material/Error';

const App = () => {
  const isMobile = useMediaQuery('(max-width:600px)');              //Check width for Mobile Devices

  const styles = {
    root: {                                                         //Main Background Style
      minHeight: '100vh',
      backgroundImage: `url(${process.env.PUBLIC_URL}/loginBG.png)`,
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
    },
    loginBox: {                                                       //LoginBox Style
      backgroundColor: 'white',
      borderRadius: '10px',
      width: isMobile ? '90%' : '100%',
      maxWidth: '450px',
      p: isMobile ? 3 : 3,
      ml: isMobile ? 0 : 'auto',
      mr: isMobile ? 0 : '80px',
    },
  };

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);                    //For Empty Field Snackbar
  const [openAuth, setOpenAuth] = React.useState(false);            //For Authontication Error Snackbar

  const checkSuccessLogin = useSelector((state) => state.auth.isLoggedIn); // Check user successfully loged or not

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   handleLogin();
  // };

  const handleLogin = async () => {
    if (!username || !password) {
      setOpen(true);
      return;
    }
    await dispatch(login({ username, password }));

    if (!checkSuccessLogin) {
      setOpenAuth(true);
      return;
    }
  };

  function TransitionRight(props) {//Auth Error Snackbar
    return <Slide {...props} direction="left" />;
  }

  return (
    <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
      <Box sx={styles.root}>
        <Box sx={styles.loginBox}>
          {/* <form onSubmit={handleFormSubmit}> */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isMobile ? 1 : 22,
              }}
            >
              <img src="/DSmart_Logo.png" alt="DSmart_Logo" />
            </div>

            <Typography
              sx={{
                textAlign: 'center',
                color: '#0097b2',
                fontWeight: 'bold',
                fontSize: '30px',
                my: isMobile ? 2 : 4,
              }}
            >
              Hi, Welcome Back
            </Typography>
            <div>
              {!isMobile && (
                <Typography
                  sx={{
                    textAlign: 'center',
                    color: 'grey',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    mb: isMobile ? 1 : 2,
                  }}
                >
                  Enter your credentials to continue
                </Typography>
              )}
            </div>
            <Divider sx={{ mb: 1 }} />
            {!isMobile && (
              <Typography
                sx={{
                  textAlign: 'center',
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: '15px',
                  mb: isMobile ? 2 : 4,
                }}
              >
                Sign in with Username and Password
              </Typography>
            )}

            <TextField
              label="Username"
              fullWidth
              variant="outlined"
              sx={{ mb: 2, borderRadius: '5px', p: 0.5 }}
              onChange={(e) => setusername(e.target.value)}
              autoComplete="username"
            />
            <TextField
              label="Password"
              fullWidth
              variant="outlined"
              type="password"
              sx={{ mb: 2, borderRadius: '5px', p: 0.5 }}
              onChange={(e) => setpassword(e.target.value)}
              autoComplete="password"
            />
            <Box
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox color="primary" />
                <Typography color="black">Remember Me</Typography>
              </Box>
              <Typography color="black">
                <a href="/">Forgot Password</a>
              </Typography>
            </Box>
            <Button
              type="submit"
              fullWidth
              sx={{
                backgroundColor: '#0097b2',
                color: 'white',
                borderRadius: '5px',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#005a6a',
                },
                padding: 1.5,
              }}
              onClick={() => handleLogin()}
            >
              Sign In
            </Button>
          {/* </form> */}
          {/* This snackbar for check empty fields */}
          <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            TransitionComponent={TransitionRight}
          >
            <SnackbarContent
              message={
                <Box display="flex" alignItems="center">
                  <ErrorIcon fontSize="small" style={{ marginRight: '8px' }} />
                  Username or password cannot be empty
                </Box>
              }
              style={{
                backgroundColor: '#f44336',
              }}
            />
          </Snackbar>
          {/* This snackbar for show any Authentication Errors. Such as username or password mismatched */}
          <Snackbar
            open={openAuth}
            autoHideDuration={2000}
            onClose={() => setOpenAuth(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            TransitionComponent={Slide}
          >
            <SnackbarContent
              message={
                <Box display="flex" alignItems="center">
                  <ErrorIcon fontSize="small" style={{ marginRight: '8px' }} />
                  Username or password not matched
                </Box>
              }
              style={{ backgroundColor: '#f44336' }}
            />
          </Snackbar>
        </Box>
      </Box>
    </Grid>
  );
};

export default App;
