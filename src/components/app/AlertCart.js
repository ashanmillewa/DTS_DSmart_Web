import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage } from '../../store/apps/message'
const useStyles = makeStyles({
  cookieAlert: {
    '& .MuiAlert-icon': {
      fontSize: 25,
    },
  },
});
const AlertCart = () => {
  // alertType = "success,error,info,warning"
  // message Body = { isShow: false, text: '', alertType: '' }
  const { message } = useSelector((state) => state.message);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    dispatch(clearMessage());
  };

  React.useEffect(() => {
    if (message.isShow === true) {
      const timer = setTimeout(() => {
        handleClick();
      }, 10);
      return () => {
        dispatch(clearMessage());
        clearTimeout(timer);
      };
    }
  }, [message]);
  const classes = useStyles();
  return (
    <React.Fragment>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleClose}
        SnackbarContentProps={{
          style: { backgroundColor: 'yellow' }, // this can't work for some reason
        }}
      >
        <Alert
          className={classes.cookieAlert}
          onClose={handleClose}
          severity={message.alertType}
          variant="filled"
          sx={{ width: '100%', color: 'white' }}
        >
          <AlertTitle sx={{ fontSize: 18 }}> {message.text}</AlertTitle>
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default AlertCart;
