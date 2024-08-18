import React from 'react';
import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import img1 from 'src/assets/images/profile/user.png';
import { IconPower } from '@tabler/icons';
import { logout } from 'src/store/auth/AuthSlice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export const Profile = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';

  const dispatch = useDispatch();
  const Fulllogout = () => {
    setOpen(false);
    dispatch(logout());
  };
  return (
    <>
      {' '}
      <Box
        display={'flex'}
        alignItems="center"
        gap={2}
        sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
      >
        {!hideMenu ? (
          <>
            <Avatar alt="Remy Sharp" src={img1} />

            <Box>
              {/* <Typography variant="h7" color="textPrimary">name</Typography> */}
              <Typography variant="caption" color="textSecondary">
                Administrator
              </Typography>
            </Box>
            <Box sx={{ ml: 'auto' }}>
              <Tooltip title="Logout" placement="top">
                <IconButton
                  color="primary"
                  onClick={handleClickOpen}
                  aria-label="logout"
                  size="small"
                >
                  <IconPower size="25" />
                </IconButton>
              </Tooltip>
            </Box>
          </>
        ) : (
          ''
        )}
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth
        sx={{
          '& .MuiDialogTitle-root': {
            backgroundColor: '#primary',
          },
          '& .MuiDialogContent-root': {
            padding: '20px',
          },
          '& .MuiDialogActions-root': {
            padding: '10px 20px',
          },
          '& .MuiButton-root': {
            textTransform: 'uppercase',
          },
          '& .MuiButton-contained': {
            backgroundColor: '#primary',
          },
          '& .MuiButton-outlined': {
            borderColor: '#primary',
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure you want to logout?'}</DialogTitle>
        {/* <DialogContent></DialogContent> */}
        <DialogActions>
          <Button onClick={Fulllogout} variant="contained">
            Logout
          </Button>
          <Button onClick={handleClose} variant="outlined" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
