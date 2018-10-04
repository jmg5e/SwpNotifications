import React from 'react';
import { FlatList } from 'react-native';
import Location from './Location';

type Props = {
  locations: Array,
  goToLocationProducts: Function,
};

const LocationList = ({ locations, goToLocationProducts }: Props) => (
  <FlatList
    style={{ marginTop: 15 }}
    data={locations}
    keyExtractor={product => `product-${product.id}`}
    renderItem={({ item }) => (<Location {...item} onPress={() => goToLocationProducts(item)} />)}
    contentContainerStyle={{ flex: 1 }}
  />
);

export default LocationList;
