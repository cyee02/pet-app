import React from 'react'
import { useHistory } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'

// import FormikTextInput from '../styles/FormikTextInput';

// Hooks
import useRegister from '../hooks/useRegister'

const initialValues = {
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  address: '',
  gender: '',
  phoneNumber: '',
  description: '',
  email: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
  firstName: yup
    .string()
    .required('First name is required'),
  lastName: yup
    .string()
    .required('Last name is required'),
  address: yup
    .string()
    .required('Address is required'),
  gender: yup
    .string()
    .required('Gender is required'),
  phoneNumber: yup
    .string()
    .required('Phone number is required'),
  description: yup
    .string()
    .required('Description is required'),
  email: yup
    .string()
    .required('Email is required'),
});

const Register = () => {
  const [register] = useRegister()
  const history = useHistory()

  const onSubmit = async (values) => {
    const {
      username,
      password,
      firstName,
      lastName,
      address,
      gender,
      phoneNumber,
      description,
      email } = values;
    try {
      await register({ username, password, firstName, lastName, address, gender, phoneNumber, description, email });
      history.push("/profile")
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      { ({errors, touched}) => (
        <div style={{"width": "50%", "justifySelf": "center"}}>
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
              <label htmlFor="password" >Password</label>
              <Field name="password" className={ touched["password"] && errors["password"] ? "invalid" : "" }/>
              <br/>
              <span className="errorMessage">
                <ErrorMessage name="password" />
              </span>
            </div>
            <div className="inputSet">
              <label htmlFor="firstName" >First name</label>
              <Field name="firstName" className={ touched["firstName"] && errors["firstName"] ? "invalid" : "" }/>
              <br/>
              <span className="errorMessage">
                <ErrorMessage name="firstName" />
              </span>
            </div>
            <div className="inputSet">
              <label htmlFor="lastName" >Last name</label>
              <Field name="lastName" className={ touched["lastName"] && errors["lastName"] ? "invalid" : "" }/>
              <br/>
              <span className="errorMessage">
                <ErrorMessage name="lastName" />
              </span>
            </div>
            <div className="inputSet">
              <label htmlFor="address" >Address</label>
              <Field name="address" className={ touched["address"] && errors["address"] ? "invalid" : "" }/>
              <br/>
              <span className="errorMessage">
                <ErrorMessage name="address" />
              </span>
            </div>
            <div className="inputSet">
              <label htmlFor="gender" >Gender</label>
              <Field name="gender" className={ touched["gender"] && errors["gender"] ? "invalid" : "" }/>
              <br/>
              <span className="errorMessage">
                <ErrorMessage name="gender" />
              </span>
            </div>
            <div className="inputSet">
              <label htmlFor="phoneNumber" >Phone Number</label>
              <Field name="phoneNumber" className={ touched["phoneNumber"] && errors["phoneNumber"] ? "invalid" : "" }/>
              <br/>
              <span className="errorMessage">
                <ErrorMessage name="phoneNumber" />
              </span>
            </div>
            <div className="inputSet">
              <label htmlFor="description" >Description</label>
              <Field name="description" className={ touched["description"] && errors["description"] ? "invalid" : "" }/>
              <br/>
              <span className="errorMessage">
                <ErrorMessage name="description" />
              </span>
            </div>
            <div className="inputSet">
              <label htmlFor="email" >Email</label>
              <Field name="email" className={ touched["email"] && errors["email"] ? "invalid" : "" }/>
              <br/>
              <span className="errorMessage">
                <ErrorMessage name="email" />
              </span>
            </div>

            <button type="submit">Register</button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default Register;