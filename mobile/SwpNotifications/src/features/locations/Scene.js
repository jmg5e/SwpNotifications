import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import {
  ListItem, Text,
} from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import { bindActionCreators } from 'redux';

type Props = {
  locations: Array,
  navigate: Function,
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
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  locations: state.locations,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  push: bindActionCreators(StackActions.push, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Locations);
