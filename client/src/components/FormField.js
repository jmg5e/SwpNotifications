import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Label } from 'semantic-ui-react';

const FormField = ({
  input: { value, ...input },
  type,
  label,
  placeholder,
  meta: { touched, error },
  as: As = Input,
  ...props
}) => {
  const isCheckbox = type === 'checkbox';
  const handleCheckboxChanged = (e, { checked }) => input.onChange(checked);
  const handleChange = (e, data) => input.onChange(data.value);
  const hasError = typeof error === 'string' && touched;

  return (
    <Form.Field error={hasError}>
      <Label>{label}</Label>
      {hasError && (
        <Label color="red" pointing="left">
          {error}
        </Label>
      )}
      <As
        {...props}
        {...input}
        value={!isCheckbox ? value : value.checked}
        type={type}
        placeholder={placeholder}
        onChange={!isCheckbox ? handleChange : handleCheckboxChanged}
      />
    </Form.Field>
  );
};

FormField.defaultProps = {
  as: Input,
  type: 'text',
  label: '',
  placeholder: '',
  meta: { touched: false, error: null, warning: '' },
};
FormField.propTypes = {
  // could be string?
  as: PropTypes.func,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string,
  }),
};

export default FormField;
