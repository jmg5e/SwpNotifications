import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';
import { isRequired, maxLength } from 'utils/validations';
import FormField from 'components/FormField';

const maxLength5 = maxLength(5);

const ProductForm = ({
  product,
  locations,
  handleSubmit,
  header,
  handleCancel,
  valid,
}) => (
  <Form onSubmit={handleSubmit} size="tiny" style={{ padding: '10px' }}>
    {header}
    <Field
      name="name"
      label="Product Name"
      component={FormField}
      as={Form.Input}
      type="text"
      value={product.name}
      validate={[isRequired]}
    />
    <Field
      name="locationId"
      label="Product Location"
      component={FormField}
      as={Form.Select}
      type="select"
      value={product.location}
      options={locations.map(loc => ({ text: loc.moniker, value: loc.id }))}
    />

    <Field
      name="slot"
      label="Slot"
      component={FormField}
      as={Form.Input}
      value={product.slot}
      type="text"
      validate={[maxLength5]}
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

ProductForm.defaultProps = {
  product: {
    name: '',
    location: '',
    slot: '',
  },
  handleCancel: null,
  header: null,
};

ProductForm.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    location: PropTypes.string,
    slot: PropTypes.string,
  }),
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func,
  header: PropTypes.node,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  valid: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'productForm',
  enableReinitialize: true,
})(ProductForm);
