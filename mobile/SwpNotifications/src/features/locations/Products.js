import React, { Component } from 'react';
import {
  View, FlatList, Alert,
} from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { requestProduct } from '../../signalR/actions';
import locations from './selectors';

type Props = {
  location: Object,
  navigation: Object,
  requestProduct: Function,
};

class Products extends Component<Props> {
  static navigationOptions = {
    headerTitle: 'Location Products',
  };

  static state = {
    searchValue: '',
  }

  componentWillMount() {
    const { location } = this.props;
    if (location && location.moniker) {
      this.props.navigation.setParams({
        title: location.moniker,
      });
    } else {
      throw Error('location not found');
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
      onLongPress={() => this.confirmRequest(item)}
      bottomDivider
      title={item.name}
      rightSubtitle={`Slot: ${item.slot}`}
    />
  )

  render() {
    return (
      <View style={{ flex: 1, marginTop: 5 }}>
        <SearchBar
          lightTheme
          placeholder="Search..."
        />
        <FlatList
          style={{ marginTop: 15 }}
          data={this.props.location.products}
          keyExtractor={product => `product-${product.id}`}
          renderItem={this.renderProduct}
        />
      </View>
    );
  }
}

const mapStateToProps = (state, props) => ({
  location: locations.getLocationById(state, props),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  requestProduct: bindActionCreators(requestProduct, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Products));
