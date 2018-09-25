import React from 'react';
import { goBack } from 'react-router-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import locations from 'features/locations/selectors';
import { updateProduct } from 'api/actions/products';
import products from './selectors';
import EditProductPage from './components/EditProductPage';

const EditProduct = props => (
  <EditProductPage
    product={props.product}
    updateProduct={props.updateProduct}
    locations={props.locations}
    goBack={props.goBack}
  />
);

EditProduct.propTypes = {
  updateProduct: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  goBack: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    location: PropTypes.object,
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  product: products.getByIdFromPath(state, ownProps),
  // product: state.products.find(p => p.id === Number(ownProps.match.params.id)),
  locations: locations.getAll(state),
});

const mapDispatchToProps = {
  updateProduct,
  goBack,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProduct);
