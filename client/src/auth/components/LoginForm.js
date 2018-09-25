import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';
import { isRequired } from 'utils/validations';
import FormField from 'components/FormField';

const LoginForm = ({
  handleSubmit, handleCancel, authenticating, valid,
}) => (
  <Form onSubmit={handleSubmit} size="large">
    <Field
      name="userName"
      component={FormField}
      as={Form.Input}
      type="text"
      label="User Name"
      placeholder="User"
      validate={[isRequired]}
    />

    <Field
      name="password"
      component={FormField}
      as={Form.Input}
      type="password"
      label="Password"
      placeholder="Password"
      validate={[isRequired]}
    />
    {handleCancel && (
      <Button type="button" primary onClick={handleCancel}>
        Cancel
      </Button>
    )}
    <Button type="submit" disabled={authenticating || !valid} loading={authenticating} primary>
      Login
    </Button>
  </Form>
);

LoginForm.defaultProps = {
  handleCancel: null,
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  authenticating: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func,
};

export default reduxForm({
  form: 'loginForm',
})(LoginForm);
