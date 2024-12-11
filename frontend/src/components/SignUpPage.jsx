import { Container, Card, Row, Col, Image, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { loginUser } from '../services/authSlice.js';
import useAuth from '../hooks';
import routes from '../routes';
import { getSignUpSchema } from '../utils/validate.js';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();
  const inputRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: getSignUpSchema(t),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.signupPath(), values);
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('username', JSON.stringify(response.data.username));
        dispatch(loginUser(response.data));
        auth.logIn();
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          formik.setFieldError('confirmPassword', t('loginAndSignUp.errors.validation.status409'));
        }
        if (err.isAxiosError && err.response.status === 401) {
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
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <Image alt="Регистрация" src="/images/signup-avatar.jpg" roundedCircle />
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('loginAndSignUp.headingSignUp')}</h1>
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="username"
                    id="username"
                    onChange={formik.handleChange}
                    name="username"
                    autoComplete="username"
                    value={formik.values.username}
                    placeholder={t('loginAndSignUp.usernameSignUp')}
                    ref={inputRef}
                    required
                    className={`${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
                    onBlur={formik.handleBlur}
                  />
                  <Form.Label htmlFor="username">{t('loginAndSignUp.usernameSignUp')}</Form.Label>
                  {formik.touched.username && formik.errors.username ? <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback> : null}
                </Form.Floating>

                <Form.Floating className="mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    id="password"
                    type="password"
                    placeholder={t('loginAndSignUp.password')}
                    name="password"
                    autoComplete="new-password"
                    aria-describedby="passwordHelpBlock"
                    aria-autocomplete="list"
                    required
                    className={`${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                    onBlur={formik.handleBlur}
                  />
                  <Form.Label htmlFor="password">{t('loginAndSignUp.password')}</Form.Label>
                  {formik.touched.password && formik.errors.password ? <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback> : null}
                </Form.Floating>

                <Form.Floating className="mb-4">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    id="confirmPassword"
                    type="password"
                    placeholder={t('loginAndSignUp.confirmPassword')}
                    name="confirmPassword"
                    autoComplete="new-password"
                    required
                    className={`${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                    onBlur={formik.handleBlur}
                  />
                  <Form.Label htmlFor="confirmPassword">{t('loginAndSignUp.confirmPassword')}</Form.Label>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? <Form.Control.Feedback type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback> : null}
                </Form.Floating>

                <Button variant="outline-primary" type="submit" className="w-100 mb-3">
                  {t('loginAndSignUp.signupBtn')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
