import React, { Component } from 'react';
import {
  View, FlatList, Alert,
} from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { requestProduct } from '../../signalR/actions';
import Inventory from './selectors';
import { filterProducts, clearProductsFilter } from './actions';

type Props = {
  location: Object,
  products: Array,
  navigation: Object,
  productsSearchValue: string | null,
  requestProduct: Function,
  filterProducts: Function,
  clearProductsFilter: Function,
};

class Products extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title || 'Products'}`,
  });


  componentWillMount() {
    const { setParams } = this.props.navigation;
    const { location } = this.props;
    if (location && location.moniker) {
      setParams({ title: `${location.moniker} Products` });
    }
  }

  confirmRequest = (product) => {
    Alert.alert(
      'Request Product',
      `Are You Sure you want to send restock request for product: ${product.name}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => this.props.requestProduct(product.id) },
      ],
      { cancelable: false },
    );
  }

  renderProduct = ({ item }) => (
    <ListItem
      scaleProps={{
        friction: 90,
        tension: 100,
        activeScale: 0.90,
      }}
      onPress={() => this.confirmRequest(item)}
      bottomDivider
      title={item.name}
      rightSubtitle={`Slot: ${item.slot}`}
    />
  )

  render() {
    return (
      <View style={{ flex: 1, marginTop: 5 }}>
        <FlatList
          style={{ marginTop: 15 }}
          data={this.props.products}
          keyExtractor={product => `product-${product.id}`}
          renderItem={this.renderProduct}
          contentContainerStyle={{ flex: 1 }}
        />

        <SearchBar
          lightTheme
          placeholder="Search..."
          onChangeText={this.props.filterProducts}
          onClear={this.props.clearProductsFilter}
          value={this.props.productsSearchValue}
          containerStyle={{ width: '100%' }}
          inputContainerStyle={{ width: '100%' }}
          inputStyle={{ width: '100%' }}
          platform="android"
        />
      </View>
    );
  }
}

const mapStateToProps = (state, props) => ({
  products: Inventory.getLocationProducts(state, props),
  location: Inventory.getCurrentLocation(state, props),
  productsSearchValue: Inventory.getProductsSearchValue(state),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  requestProduct: bindActionCreators(requestProduct, dispatch),
  filterProducts: bindActionCreators(filterProducts, dispatch),
  clearProductsFilter: bindActionCreators(clearProductsFilter, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Products));
