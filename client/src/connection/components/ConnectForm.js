import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, Segment } from 'semantic-ui-react';
import FormField from 'components/FormField';
import { isRequired, maxLength, minLength } from 'utils/validations';

const min3 = minLength(3);
const max15 = maxLength(15);

const ConnectForm = ({
  handleSubmit, valid,
}) => (
  <Form onSubmit={handleSubmit}>
    <Segment basic>
      <Field
        name="name"
        component={FormField}
        as={Form.Input}
        type="text"
        label="Name"
        placeholder="Name"
        validate={[isRequired, min3, max15]}
      />
      <Form.Button fluid type="submit" size="large" disabled={!valid}>
        Connect
      </Form.Button>
    </Segment>
  </Form>
);

ConnectForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'connectForm',
})(ConnectForm);
