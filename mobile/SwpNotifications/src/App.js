/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PushController from './notifications/PushController';
import { ConnectedNavigator } from './navigation/AppNavigator';
import HardwareBackHandler from './navigation/HardwareBackHandler';

const AppContainer = styled.View`
  display: flex;
  flex: 1;
`;

type Props = {
  // dispatch: Function,
};

class App extends Component<Props> {
  componentDidMount() {
    // this.props.connectToHub(DeviceInfo.getModel());
  }

  render() {
    return (
      <AppContainer>
        <ConnectedNavigator />
        <HardwareBackHandler />
      </AppContainer>
    );
  }
}

// const mapStateToProps = state => ({
//   ...state.connection,
//   nav: state.navigation,
// });

const mapDispatchToProps = dispatch => ({
  dispatch,
  // connectToHub: bindActionCreators(connectToHub, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(App);
