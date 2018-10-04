import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import {
  ListItem, Text, Button,
} from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { getInventory } from '../../api/actions';
import Inventory from './selectors';

type Props = {
  locations: Array,
  navigate: Function,
  getInventory: Function,
};

class Locations extends Component<Props> {
  static navigationOptions = {
    headerTitle: 'Locations',
  };

  goToLocationProducts = (location) => {
    this.props.navigate({ routeName: 'products', params: { locationId: location.id } });
  }

  renderLocation = ({ item }) => (
    <ListItem
      onPress={() => this.goToLocationProducts(item)}
      title={item.moniker}
      subtitle={item.floor}
    />
  )

  render() {
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        {this.props.locations.map(loc => (
          <ListItem
            key={loc.id}
            chevron
            bottomDivider
            onPress={() => this.goToLocationProducts(loc)}
            title={loc.moniker}
            subtitle={loc.floor}
          />
        ))}
        {this.props.locations.length <= 0 && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text h3>No Locations</Text>
            <Button title="Get Inventory" onPress={this.props.getInventory} />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  locations: Inventory.getLocations(state),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  getInventory: bindActionCreators(getInventory, dispatch),
  push: bindActionCreators(StackActions.push, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Locations);
