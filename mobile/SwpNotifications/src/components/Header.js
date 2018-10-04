import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, ToolbarAndroid,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { disconnect } from '../signalR/actions';
import { getLocations } from '../api/actions';

const styles = StyleSheet.create({
  toolbar: {
    height: 56,
    backgroundColor: '#282639',
  },
});

type Props = {
  title?: string,
  navigate: Function,
  disconnect: Function,
  updateInventory: Function,
}

class Header extends Component<Props> {
  onActionSelected = (position) => {
    switch (position) {
      case 0:
        this.props.navigate({ routeName: 'settings' });
        break;
      case 1:
        this.props.updateInventory();
        break;
      case 2:
        this.props.disconnect();
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <ToolbarAndroid
        style={styles.toolbar}
        title={this.props.title}
        titleColor="#EAEDF3"
        actions={[
          { title: 'Settings', show: 'never' },
          { title: 'Update Inventory', show: 'never' },
          { title: 'Disconnect', show: 'never' },
        ]}
        onActionSelected={this.onActionSelected}
      />
    );
  }
}
Header.defaultProps = {
  title: 'SwpNotifications',
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch),
  disconnect: bindActionCreators(disconnect, dispatch),
  updateInventory: bindActionCreators(getLocations, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
