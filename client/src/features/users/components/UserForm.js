import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';
import { isRequired, matchesPassword } from 'utils/validations';
import FormField from 'components/FormField';

const UserForm = ({
  handleSubmit, currentUser, user, mode, handleCancel, valid,
}) => (
  <Form onSubmit={handleSubmit} size="large">
    <Field
      disabled={mode === 'edit'}
      name="userName"
      component={FormField}
      as={Form.Input}
      type="input"
      label="User Name"
      validate={[isRequired]}
    />
    <Field
      name="isAdmin"
      component={FormField}
      as={Form.Checkbox}
      type="checkbox"
      label="Admin"
      disabled={mode === 'edit' && currentUser === user.userName}
    />
    <Field
      name="isLocked"
      component={FormField}
      as={Form.Checkbox}
      type="checkbox"
      label="Account Locked"
      disabled={mode === 'edit' && currentUser === user.userName}
    />
    <Field
      name="hubGroups"
      component="select"
      type="select-multiple"
      disabled={mode === 'edit' && currentUser === user.userName}
      multiple
      style={{ color: 'red' }}
    >
      <option value="RequestListener">RequestListener</option>
      <option value="ClientListener">ClientListener</option>
    </Field>
    <Field
      name="password"
      id="password"
      component={FormField}
      as={Form.Input}
      autoComplete="new-password"
      type="password"
      label="Password"
      validate={mode === 'create' ? [isRequired] : []}
      placeholder="Password"
    />
    <Field
      name="passwordVerify"
      component={FormField}
      as={Form.Input}
      autoComplete="off"
      type="password"
      label="Confirm Password"
      validate={mode === 'create' ? [isRequired, matchesPassword] : [matchesPassword]}
      placeholder="Password"
    />
    <Button type="button" primary onClick={handleCancel}>
      Cancel
    </Button>
    <Button type="submit" disabled={!valid} primary>
      Submit
    </Button>
  </Form>
);

UserForm.defaultProps = {
  user: null,
};

UserForm.propTypes = {
  user: PropTypes.shape({
    userName: PropTypes.string,
    id: PropTypes.string,
    hubGroups: PropTypes.arrayOf(PropTypes.string),
    isAdmin: PropTypes.bool,
    isLocked: PropTypes.bool,
  }),
  handleSubmit: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  mode: PropTypes.oneOf(['edit', 'create']).isRequired,
  currentUser: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'userForm',
  enableReinitialize: true,
})(UserForm);
