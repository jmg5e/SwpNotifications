import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';
import { isRequired, maxLength } from 'utils/validations';
import FormField from 'components/FormField';

const maxLength10 = maxLength(10);

const LocationForm = ({
  location,
  handleSubmit,
  handleCancel,
  valid,
}) => (
  <Form onSubmit={handleSubmit} size="tiny" style={{ padding: '10px' }}>
    <Field
      name="moniker"
      label="Location Name"
      component={FormField}
      as={Form.Input}
      type="text"
      value={location.name}
      validate={[isRequired, maxLength10]}
    />
    <Field
      name="floor"
      label="Location Floor"
      component={FormField}
      as={Form.Input}
      type="text"
      value={location.floor}
    />
    {handleCancel && (
      <Button type="button" primary onClick={handleCancel}>
        Cancel
      </Button>
    )}
    <Button type="submit" disabled={!valid} primary>
      Submit
    </Button>
  </Form>
);

LocationForm.defaultProps = {
  location: {
    id: null,
    moniker: '',
    floor: '',
  },
  handleCancel: null,
};

LocationForm.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.number,
    moniker: PropTypes.string,
    floor: PropTypes.string,
  }),
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func,
  valid: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'locationForm',
  // enableReinitialize: true,
})(LocationForm);
