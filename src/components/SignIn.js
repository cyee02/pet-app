import React from 'react'
import { useHistory } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'

// Styles
import '../App.css';

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
      { ({errors, touched}) => (
        <div style={{marginTop: "10%"}}>
          <img src="icons/paw.png" alt="logo" className="logo"/>
          <Form>
            <div className="inputSet">
              <label htmlFor="username" >Username</label>
              <Field name="username" className={ touched["username"] && errors["username"] ? "invalid" : "" }/>
              <br/>
              <span className="errorMessage">
                <ErrorMessage name="username" />
              </span>
            </div>
            <div className="inputSet">
              <label htmlFor="password">Password</label>
              <Field name="password" type='password' className={ touched["password"] && errors["password"] ? "invalid" : "" }/>
              <br/>
              <span className="errorMessage">
                <ErrorMessage name="password" />
              </span>
            </div>
            <div className="buttonContainerVertical" style={{marginTop: "5%"}}>
              <button type="submit" >Log In</button>
              <button onClick={handleSignUp}>Register</button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default SignIn;