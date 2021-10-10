import React from 'react'
import { useHistory } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'

// import FormikTextInput from '../styles/FormikTextInput';

// Hooks
import useLogin from '../hooks/useLogin'

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignIn = () => {
  const [login] = useLogin()
  const history = useHistory()

  const handleSignUp = () => {
    history.push('/register')
  }

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await login({ username, password });
      history.push("/profile");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      { () => (
        <div>
          <Form>
            <label htmlFor="username">Username</label>
            <Field name="username" />
            <ErrorMessage name="username" />

            <label htmlFor="password">Password</label>
            <Field name="password" type='password'/>
            <ErrorMessage name="password" />

            <button type="submit">Log In</button>
            <button onClick={handleSignUp}>Register</button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default SignIn;