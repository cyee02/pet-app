import React from 'react'
import { useHistory } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'

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

const SignIn = ({myProfile}) => {
  const [login] = useLogin()
  const history = useHistory()

  if (myProfile) {
    history.push("/profile")
  }

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
        <div style={{"width": "40%", "justifySelf": "center"}}>
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
            <div className="buttonContainerHorizontal" style={{marginTop: "5%", "justifyContent": "center"}}>
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