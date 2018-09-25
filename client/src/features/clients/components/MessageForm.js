import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';
import { isRequired } from 'utils/validations';
import FormField from 'components/FormField';

const MessageForm = ({
  handleSubmit, handleCancel, valid,
}) => (
  <Form onSubmit={handleSubmit} size="large">
    <Field
      name="text"
      component={FormField}
      as={Form.TextArea}
      label="Text"
      placeholder="text"
      validate={[isRequired]}
    />
    {handleCancel && (
      <Button type="button" primary onClick={handleCancel}>
        Cancel
      </Button>
    )}
    <Button type="submit" disabled={!valid} primary>
      Send
    </Button>
  </Form>
);

MessageForm.defaultProps = {
  handleCancel: null,
};

MessageForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func,
};

export default reduxForm({
  form: 'messageForm',
})(MessageForm);
