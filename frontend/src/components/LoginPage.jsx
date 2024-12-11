import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { loginUser } from '../services/authSlice.js';
import routes from '../routes.js';
import useAuth from '../hooks/index.jsx';

const LoginPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('token', JSON.stringify(res.data.token));
        localStorage.setItem('username', JSON.stringify(res.data.username));
        dispatch(loginUser(res.data));
        auth.logIn();
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw new Error(err);
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <Image src="/images/login-avatar.jpeg" alt="Войти" roundedCircle />
              </Col>
              <Form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('loginAndSignUp.heading')}</h1>
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="username"
                    id="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder={t('loginAndSignUp.username')}
                    ref={inputRef}
                    name="username"
                    autoComplete="username"
                    required
                    isInvalid={authFailed}
                  />
                  <Form.Label htmlFor="username">{t('loginAndSignUp.username')}</Form.Label>
                </Form.Floating>

                <Form.Floating className="mb-4">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    id="password"
                    type="password"
                    placeholder={t('loginAndSignUp.password')}
                    name="password"
                    autoComplete="current-password"
                    required
                    isInvalid={authFailed}
                  />
                  <Form.Label htmlFor="password" className="mb-4">
                    {t('loginAndSignUp.password')}
                  </Form.Label>
                  <Form.Control.Feedback type="invalid">{t('loginAndSignUp.errors.validation.wrongData')}</Form.Control.Feedback>
                </Form.Floating>
                <Button variant="outline-primary" type="submit" className="w-100 mb-3">
                  {t('loginAndSignUp.loginBtn')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('loginAndSignUp.footerSpan')}</span> <Link to="/signup">{t('loginAndSignUp.linkSignUp')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
