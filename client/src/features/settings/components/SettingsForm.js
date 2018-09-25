import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, Segment } from 'semantic-ui-react';
import FormField from 'components/FormField';

const SettingsForm = ({
  handleSubmit,
  handleCancel,
  clearCache,
  resetSettings,
}) => (
  <Form onSubmit={handleSubmit}>
    <Segment basic>
      <Field
        name="server"
        component={FormField}
        as={Form.Input}
        type="text"
        label="Server"
        placeholder="Server Ip"
      />
    </Segment>
    <Segment>
      <Form.Button
        fluid
        icon="trash"
        type="button"
        content="Clear Cache"
        onClick={clearCache}
        color="orange"
      />
      <Form.Button fluid onClick={resetSettings} type="button">
        Default Settings
      </Form.Button>
    </Segment>
    <Segment basic style={{ padding: 10 }}>
      <Form.Button
        fluid
        size="large"
        style={{ marginBottom: '10px' }}
        onClick={handleCancel}
      >
        Cancel
      </Form.Button>
      <Form.Button fluid type="submit" size="large">
        Save
      </Form.Button>
    </Segment>
  </Form>
);

SettingsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  clearCache: PropTypes.func.isRequired,
  resetSettings: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'settingsForm',
})(SettingsForm);
