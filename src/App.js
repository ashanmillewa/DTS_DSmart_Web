import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeSettings } from './theme/Theme';
import RTL from './layouts/full/shared/customizer/RTL';
import ScrollToTop from './components/shared/ScrollToTop';
// import { Router } from './routes/Router';
import AlertCart from './components/app/AlertCart';
import { useAuth } from './store/auth/authContext';
function App() {
  const theme = ThemeSettings();
  const customizer = useSelector((state) => state.customizer);
  const { isAuthenticated, validating, Router, AuthRouter } = useAuth();
  const authRouter = useRoutes(AuthRouter);
  const appRouter = useRoutes(Router);
  return (
    <ThemeProvider theme={theme}>
      <RTL direction={customizer.activeDir}>
        <CssBaseline />
        <AlertCart />
        {!isAuthenticated ? (
          <ScrollToTop>{authRouter}</ScrollToTop>
        ) : (
          <>
            <ScrollToTop>{appRouter}</ScrollToTop>
          </>
        )}
        {/* <ScrollToTop>{routing}</ScrollToTop> */}
      </RTL>
    </ThemeProvider>
  );
}

export default App;
