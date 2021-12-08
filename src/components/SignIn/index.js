import React, {useState} from 'react'
import { useHistory } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {Dialog, DialogContent, DialogContentText, DialogActions, Button} from '@mui/material';
import * as yup from 'yup'

// Hooks
import useLogin from './useLogin'

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
  const [isError, setIsError] = useState(false)

  if (myProfile) {
    history.push(`/user/${myProfile.username}`)
  }

  const handleSignUp = () => {
    history.push('/register')
  }

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await login({ username, password });
      history.push(`/user/${myProfile.username}`)
    } catch (e) {
      setIsError(true)
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      { ({errors, touched}) => (
        <div style={{"width": "40%", "justifySelf": "center"}}>
          <img src={require("../../assets/icons/paw.png").default} alt="logo" className="logo"/>
          <Form>
            <div className="inputSet">
              <label htmlFor="username" >Username</label>
              <Field name="username" autoCapitalize="off" className={ touched["username"] && errors["username"] ? "invalid" : "" }/>
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
          <Dialog
            open={isError}
            aria-describedby="alert-dialog-description"
            >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Invalid username or password
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsError(false)} autofocus>Okay</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </Formik>
  );
}

export default SignIn;