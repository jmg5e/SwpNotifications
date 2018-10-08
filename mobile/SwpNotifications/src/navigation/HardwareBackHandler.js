import React from 'react';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import type { NavigationState } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

type Props = {
  nav: NavigationState,
  goBack: Function,
};

const getCurrentRoute = (navState: NavigationState) => (navState.index !== undefined
  ? getCurrentRoute(navState.routes[navState.index])
  : navState.routeName);

class HardwareBackHandler extends React.Component<Props> {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const currentRoute = getCurrentRoute(this.props.nav);
    if (currentRoute !== 'locations' && currentRoute !== 'disconnected') {
      this.props.goBack();
    }
    return true;
  };

  render() {
    return null;
    // return this.props.children;
  }
}
const mapStateToProps = state => ({ nav: state.navigation });

const mapDispatchToProps = dispatch => ({
  goBack: bindActionCreators(NavigationActions.back, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HardwareBackHandler);
