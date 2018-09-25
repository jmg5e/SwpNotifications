import React from 'react';
import PropTypes from 'prop-types';
import Page from 'components/Page';
import ProductForm from './ProductForm';

const EditProductPage = ({
  product, locations, updateProduct, goBack,
}) => (
  <Page.Layout>
    <Page.Header>Edit Product</Page.Header>
    <Page.Main>
      <ProductForm
        initialValues={product}
        locations={locations}
        handleCancel={goBack}
        onSubmit={updateProduct}
      />
    </Page.Main>
  </Page.Layout>
);

EditProductPage.defaultProps = {};

EditProductPage.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    location: PropTypes.string,
    slot: PropTypes.string,
  }).isRequired,
  goBack: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    moniker: PropTypes.string,
  })).isRequired,
};

export default EditProductPage;
