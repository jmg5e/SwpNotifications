import React, { Component } from 'react';
import filterItemByValue from 'utils/filter';
import { push } from 'react-router-redux';
import { requestProduct } from 'signalR/actions';
import locations from 'features/locations/selectors';
import { getProducts, deleteProduct } from 'api/actions/products';
import { confirm } from 'features/confirm/actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductsPage from './components/ProductsPage';
import products from './selectors';


class Products extends Component {
  state = {
    searchValue: '',
    locationSelect: '',
  };

  componentDidMount() {
    if (this.props.products.length === 0) this.props.getProducts();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  confirmProductDelete = (id) => {
    this.props.confirm(() => this.props.deleteProduct(id), `Are You Sure you want to Delete Product:${id}`);
  }

  goToProductPage = (product) => {
    this.props.push(`/products/${product.id}`);
  };

  goToCreateProductPage = () => {
    this.props.push('/products/new');
  };

  render() {
    return (
      <ProductsPage
        {...this.state}
        handleChange={this.handleChange}
        goToProductPage={this.goToProductPage}
        goToCreateProductPage={this.goToCreateProductPage}
        getProducts={this.props.getProducts}
        locations={this.props.locations}
        requestProduct={this.props.requestProduct}
        deleteProduct={this.confirmProductDelete}
        products={this.props.products
          .filter(filterItemByValue(this.state.locationSelect, 'location'))
          .filter(filterItemByValue(this.state.searchValue, 'name'))}
      />
    );
  }
}

Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  requestProduct: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.string).isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      location: PropTypes.string,
      slot: PropTypes.string,
      floor: PropTypes.string,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  products: products.getAll(state),
  authenticated: state.auth.authenticated,
  locations: locations.getAll(state).map(l => l.moniker),
});

const mapDispatchToProps = {
  getProducts,
  deleteProduct,
  confirm,
  requestProduct,
  push,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Products);
