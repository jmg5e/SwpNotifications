import { NavigationActions } from 'react-navigation';
import Types from '../connection/types';
import SettingTypes from '../features/settings/types';
import AppNavigator from './AppNavigator';

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('disconnected'));

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.CONNECTION_SUCCEEDED:
      return AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('main'));
    case Types.CONNECTION_CLOSED:
      return AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('disconnected'));
    case SettingTypes.SETTINGS_UPDATED:
      return AppNavigator.router.getStateForAction(NavigationActions.back(), state);
    default:
      // https://github.com/react-navigation/react-navigation/issues/485
      // Simply return the original `state` if `nextState` is null or undefined.
      return AppNavigator.router.getStateForAction(action, state) || state;
  }
};

export default navReducer;
