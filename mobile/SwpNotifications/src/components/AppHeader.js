import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Header, Icon } from 'react-native-elements';
import { disconnect } from '../signalR/actions';
import { getLocations } from '../api/actions';
import DropDownMenu from './DropdownMenu';

type Props = {
  disconnect: Function,
  updateInventory: Function,
  goToSettings: Function,
}

const AppHeader = (props: Props) => (
  <Header
    centerComponent={{ text: 'SwpNotifications', style: { color: '#fff' } }}
    rightComponent={(
      <DropDownMenu
        actions={[
          { text: 'Settings', action: props.goToSettings },
          { text: 'Update Inventory', action: props.updateInventory },
          { text: 'Disconnect', action: props.disconnect },
        ]}
        menu={<Icon name="more-vert" underlayColor="transparent" color="#fff" />}
      />
)}
    outerContainerStyles={{ backgroundColor: '#3D6DCC' }}
  />);

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  goToSettings: () => NavigationActions.navigate({ routeName: 'settings' }),
  disconnect,
  updateInventory: getLocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
