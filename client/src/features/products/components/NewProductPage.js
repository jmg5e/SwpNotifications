import React from 'react';
import PropTypes from 'prop-types';
import Page from 'components/Page';
import ProductForm from './ProductForm';

const NewProductPage = ({
  locations, createProduct, goBack,
}) => (
  <Page.Layout>
    <Page.Header>New Product</Page.Header>
    <Page.Main>
      <ProductForm
        locations={locations}
        handleCancel={goBack}
        onSubmit={createProduct}
      />
    </Page.Main>
  </Page.Layout>
);

NewProductPage.defaultProps = {};

NewProductPage.propTypes = {
  goBack: PropTypes.func.isRequired,
  createProduct: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    moniker: PropTypes.string,
  })).isRequired,
};

export default NewProductPage;
