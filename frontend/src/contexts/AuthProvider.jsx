import { Provider, ErrorBoundary } from '@rollbar/react';
import {
  useEffect, useState, useCallback, useMemo,
} from 'react';
import { useDispatch } from 'react-redux';
import AuthContext from './index.jsx';
import { logoutUser } from '../services/authSlice.js';

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: 'testenv',
};

const AuthProvider = ({ children }) => {
  const hasToken = !!localStorage.getItem('token');
  const [loggedIn, setLoggedIn] = useState(hasToken);
  const dispatch = useDispatch();

  const logIn = useCallback(() => {
    setLoggedIn(true);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    dispatch(logoutUser());
    setLoggedIn(false);
  }, [dispatch]);

  useEffect(() => {
    const user = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (user && token) {
      logIn();
    } else {
      logOut();
    }
  }, [logIn, logOut]);

  const value = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn, logIn, logOut]);

  return (
    <AuthContext.Provider value={value}>
      <Provider config={rollbarConfig}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
