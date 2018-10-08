import React from 'react';
import Page from 'components/Page';
import DataTable from 'components/DataTable';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import IfAuthenticated from 'auth/IfAuthenticated';
import ProductSearch from './ProductSearch';
import LocationSelect from './LocationSelect';
import ProductTableHeader from './TableHeader';
import ProductTableRow from './TableRow';

const ProductsPage = props => (
  <Page.Layout>
    <Page.Header>Products</Page.Header>
    <Page.TopBar>
      <ProductSearch
        name="searchValue"
        value={props.searchValue}
        handleChange={props.handleChange}
      />
      <LocationSelect
        name="locationSelect"
        locations={props.locations}
        value={props.locationSelect}
        handleChange={props.handleChange}
      />
      <Button icon="refresh" content="Refresh" onClick={props.getProducts} />
      <IfAuthenticated>
        <Button content="New Product" icon="add" onClick={props.goToCreateProductPage} />
      </IfAuthenticated>
    </Page.TopBar>
    <Page.Main>
      <DataTable
        data={props.products}
        renderRow={({ item }) => (
          <ProductTableRow
            product={item}
            requestProduct={props.requestProduct}
            edit={() => props.goToProductPage(item)}
            deleteProduct={() => props.deleteProduct(item.id)}
          />
        )}
        renderHeader={headerProps => <ProductTableHeader {...headerProps} />}
      />
    </Page.Main>
  </Page.Layout>
);

ProductsPage.propTypes = {
  getProducts: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  goToCreateProductPage: PropTypes.func.isRequired,
  goToProductPage: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  locationSelect: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
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

export default ProductsPage;
