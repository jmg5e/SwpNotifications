import React, { Component } from 'react';
import DeviceInfo from 'react-native-device-info';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { connectToHub } from '../signalR/actions';
// import ConnectForm from './components/ConnectForm';
import ConnectScene from './components/ConnectScene';

type Props = {
  connectToHub: Function,
  navigate: Function,
  errorMessage: string,
  connecting: boolean,
};

// const Disconnected = props => (
class Disconnected extends Component<Props> {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.deviceModel = DeviceInfo.getModel();
  }

  goToSettings = () => {
    this.props.navigate({ routeName: 'settings' });
  };

  render() {
    return (
      <ConnectScene
        connecting={this.props.connecting}
        errorMessage={this.props.errorMessage}
        goToSettings={this.goToSettings}
        connectToHub={this.props.connectToHub}
      />
    );
  }
}
// );
const mapStateToProps = state => ({ ...state.connection });

const mapDispatchToProps = {
  connectToHub,
  navigate: NavigationActions.navigate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Disconnected);
