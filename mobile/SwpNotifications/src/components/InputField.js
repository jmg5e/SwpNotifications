import React from 'react';
import { FieldProps } from 'formik';
import { Input } from 'react-native-elements';

type Props = {
  ...FieldProps,
  As?: Object,
}

const InputField = (props: Props) => {
  const {
    as: As = Input,
    field, // { name, value, onChange, onBlur }
    form: {
      touched, errors, setFieldValue, setFieldTouched,
    },
    ...inputProps
  } = props;
  const errorMsg = touched[field.name] && errors[field.name];

  return (
    <As
      {...inputProps}
      errorMessage={errorMsg}
      onChangeText={text => setFieldValue(field.name, text)}
      onBlur={() => setFieldTouched(field.name, true, true)}
      value={field.value}
    />
  );
};

InputField.defaultProps = {
  As: Input,
};

export default InputField;
