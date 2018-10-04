import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import Settings from '../features/settings/Settings';
import Connect from '../connection/Connect';
import Locations from '../features/inventory/Locations';
import Products from '../features/inventory/Products';
import AppHeader from '../components/AppHeader';
import ProductsHeader from '../components/ProductsHeader';

export const MainStack = createStackNavigator({
  locations: {
    screen: Locations,
  },
  products: {
    screen: Products,
    navigationOptions: {
      header: <ProductsHeader />,
    },
  },
});

const RootNavigator = createStackNavigator(
  {
    main: {
      screen: MainStack,
      navigationOptions: {
        header: <AppHeader />,
      },
    },
    disconnected: {
      screen: Connect,
      navigationOptions: {
        headerTitle: 'Connect',
      },
    },
    settings: {
      screen: Settings,
      navigationOptions: {
        headerTitle: 'Settings',
      },
    },
  },
  {
    mode: 'modal',
    initialRouteName: 'disconnected',
  },
);

export default RootNavigator;
const mapStateToProps = state => ({
  state: state.navigation,
});

/* creates listener for 'root' not really needed for redux store? */
export const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  mapStateToProps,
);

export const ConnectedNavigator = connect(mapStateToProps)(
  reduxifyNavigator(RootNavigator, 'root'),
);
