import React from 'react';
import { goBack } from 'react-router-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import locations from 'features/locations/selectors';
import { createProduct } from 'api/actions/products';
import NewProductPage from './components/NewProductPage';

const NewProduct = props => (
  <NewProductPage
    goBack={props.goBack}
    createProduct={props.createProduct}
    locations={props.locations}
  />
);

NewProduct.propTypes = {
  createProduct: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    moniker: PropTypes.string,
  })).isRequired,
  goBack: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({ locations: state.locations });
const mapStateToProps = state => ({
  locations: locations.getAll(state),
});

const mapDispatchToProps = {
  createProduct,
  goBack,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewProduct);
