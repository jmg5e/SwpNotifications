import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, Segment, Button } from 'semantic-ui-react';
import { isRequired } from 'utils/validations';
import FormField from 'components/FormField';
import styled from 'styled-components';

export const FormActions = styled.div`
  display: grid;
  grid-template-columns: 100 1fr 100;
  grid-template-areas: "cancel null submit";
`;

export const CancelButton = styled(Button)`
  grid-area: cancel;
`;

export const SubmitButton = styled(Button)`
  grid-area: submit;
`;

const LoginForm = ({
  handleSubmit, handleCancel, authenticating, valid,
}) => (
  <Form
    onSubmit={handleSubmit}
  >
    <Segment loading={authenticating}>
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
      <FormActions>
        <SubmitButton type="submit" disabled={authenticating || !valid} primary content="Login" />
        <CancelButton type="button" negative onClick={handleCancel} content="Cancel" />
      </FormActions>
    </Segment>
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
