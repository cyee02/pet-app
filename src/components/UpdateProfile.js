import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'

// Styles
import "../styles/containers.css"
// import FormikTextInput from '../styles/FormikTextInput';

// Hooks
import useUpdateProfile from '../hooks/useUpdateProfile'

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required'),
  lastName: yup
    .string()
    .required('Last name is required'),
  address: yup
    .string()
    .required('Address is required'),
  description: yup
    .string()
    .required('Description is required')
});

const UpdateProfile = ({myProfile, setUpdatingProfile}) => {
  const [updateProfile] = useUpdateProfile()

  const initialValues = {
    firstName: myProfile.firstName,
    lastName: myProfile.lastName,
    address: myProfile.address,
    phoneNumber: myProfile.phoneNumber,
    description: myProfile.description,
  }

  const onSubmit = async (values) => {
    const {
      firstName,
      lastName,
      address,
      phoneNumber,
      description} = values;
    try {
      await updateProfile({ firstName, lastName, address, phoneNumber, description });
      setUpdatingProfile(false)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      <div> 
        <Form>
          <label htmlFor="firstName">First name</label>
          <Field name="firstName"/>
          <ErrorMessage name="firstName" />

          <label htmlFor="lastName">Last name</label>
          <Field name="lastName"/>
          <ErrorMessage name="lastName" />

          <label htmlFor="address">Address</label>
          <Field name="address" type='address'/>
          <ErrorMessage name="address" />

          <label htmlFor="phoneNumber">Phone Number</label>
          <Field name="phoneNumber"/>
          <ErrorMessage name="phoneNumber" />

          <label htmlFor="description">Description</label>
          <Field name="description"/>
          <ErrorMessage name="description" />

          <button type="submit">Update</button>
        </Form>
      </div>
    </Formik>
  );
}

export default UpdateProfile;