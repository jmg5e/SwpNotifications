import React from 'react';
import { FlatList } from 'react-native';
import Product from './Product';

type Props = {
  products: Array,
  confirmRequest: Function,
};

const ProductList = ({ products, confirmRequest }: Props) => (
  <FlatList
    style={{ marginTop: 15 }}
    data={products}
    keyExtractor={product => `product-${product.id}`}
    renderItem={({ item }) => (
      <Product {...item} onPress={() => confirmRequest(item)} />
    )}
    contentContainerStyle={{ flex: 1 }}
  />
);

export default ProductList;
