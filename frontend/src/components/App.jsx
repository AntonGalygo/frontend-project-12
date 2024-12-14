import { useEffect } from 'react';
import {
  BrowserRouter as Router, Routes, Route, useLocation, Navigate,
} from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import filter from 'leo-profanity';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import AuthProvider from '../contexts/AuthProvider.jsx';
import SignUpPage from './SignUpPage';
import HomePage from './HomePage.jsx';
import useAuth from '../hooks/index.jsx';
import { addChannel, removeChannel, updateChannel } from '../services/channelsSlice.js';
import { addMessage } from '../services/messagesSlice.js';
import socket from '../socket.js';
import resources from '../locales/index.js';
import 'react-toastify/dist/ReactToastify.min.css';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />;
};

const AuthButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  return auth.loggedIn && <Button onClick={auth.logOut}>{t('navbar.logOutButton')}</Button>;
};

const App = () => {
  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  i18next.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });
    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload.id));
    });
    socket.on('renameChannel', (payload) => {
      dispatch(updateChannel({ changes: { name: payload.name }, id: payload.id }));
    });

    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, [dispatch]);

  return (
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <Router>
          <Navbar expand="lg" className="shadow-sm bg-white">
            <Container>
              <Navbar.Brand href="/">{t('navbar.homeLink')}</Navbar.Brand>
              <AuthButton />
            </Container>
          </Navbar>

          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route
              path="/"
              element={<PrivateRoute><HomePage /></PrivateRoute>}
            />
          </Routes>
        </Router>
      </div>
      <ToastContainer closeOnClick />
    </AuthProvider>
  );
};

export default App;
