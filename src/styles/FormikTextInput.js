import React from 'react';
import { useField } from 'formik';

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <div>
      <input
        onChange={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        width='60%'
        marginLeft='20%'
        marginRight='20%'
        {...props}
      />
      {showError && <p>{meta.error}</p>}
    </div>
  );
};

export default FormikTextInput;