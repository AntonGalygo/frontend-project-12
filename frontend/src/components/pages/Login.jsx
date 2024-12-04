import { Formik } from 'formik';

const Login = () => {
  const handleFormSubmit = () => alert('yes');

  return (
    <>
      <h1>Login page</h1>
      <Formik initialValues={{ nickname: '', password: '' }} onSubmit={handleFormSubmit}>
        <form>
          <input type="text" name="nickname" />
          <input type="password" name="password" />
          <button type="submit">Войти</button>
        </form>
      </Formik>
    </>
  );
};

export default Login;
