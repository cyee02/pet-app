import React from 'react'
import { useHistory } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'

// Styles
import "../styles/containers.css"
// import FormikTextInput from '../styles/FormikTextInput';

// Hooks
import useRegister from '../hooks/useRegister'

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
      <div> 
        <Form>
          <label htmlFor="username">Username</label>
          <Field name="username" />
          <ErrorMessage name="username" />

          <label htmlFor="password">Password</label>
          <Field name="password" type='password'/>
          <ErrorMessage name="password" />

          <label htmlFor="firstName">First name</label>
          <Field name="firstName"/>
          <ErrorMessage name="firstName" />

          <label htmlFor="lastName">Last name</label>
          <Field name="lastName"/>
          <ErrorMessage name="lastName" />

          <label htmlFor="address">Address</label>
          <Field name="address" type='address'/>
          <ErrorMessage name="address" />

          <label htmlFor="gender">Gender</label>
          <Field name="gender"/>
          <ErrorMessage name="gender" />

          <label htmlFor="phoneNumber">Phone Number</label>
          <Field name="phoneNumber"/>
          <ErrorMessage name="phoneNumber" />

          <label htmlFor="description">Description</label>
          <Field name="description"/>
          <ErrorMessage name="description" />

          <label htmlFor="email">Email</label>
          <Field name="email" type='email'/>
          <ErrorMessage name="email" />

          <button type="submit">Register</button>
        </Form>
      </div>
    </Formik>
  );
}

export default Register;