import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router, AuthRouter } from '../../routes/Router';
import { login, logout, validateToken } from './AuthSlice';
const DSM_Token = JSON.parse(localStorage.getItem('DSM_Token'));
const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  const { isLoggedIn, loading, validating } = useSelector((state) => state.auth);

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (DSM_Token) {
      dispatch(validateToken());
      return isLoggedIn;
    }
    return false;
  });
  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
  }, [isLoggedIn]);
  
  const handleLogin = (values) => {
    dispatch(login(values));
  };
  const handleLogout = () => {
    dispatch(logout());
    // dispatch(reset());
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          Router,
          AuthRouter,
          isAuthenticated,
          loading,
          validating,
          handleLogin,
          handleLogout,
          setIsAuthenticated,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
