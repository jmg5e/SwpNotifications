import React from 'react';
import { connect } from 'react-redux';
import { Header, Icon } from 'react-native-elements';
import DropDownMenu from './DropdownMenu';
import HeaderBackButton from './HeaderBackButton';
import Inventory from '../features/inventory/selectors';

type Props = {
  location?: {
    moniker: string,
  },
};

const getTitle = location => (location.moniker ? `${location.moniker} Products` : 'Products');

const ProductsHeader = (props: Props) => (
  <Header
    leftComponent={<HeaderBackButton />}
    centerComponent={{
      text: getTitle(props.location),
    }}
    rightComponent={(
      <DropDownMenu
        actions={[
          // eslint-disable-next-line
          { text: 'By Name', action: () => console.log('sort: by name') },
          // eslint-disable-next-line
          { text: 'By Slot', action: () => console.log('sort: by slot') },
        ]}
        menu={<Icon name="sort" underlayColor="transparent" />}
      />
      )}
    outerContainerStyles={{ backgroundColor: 'white' }}
  />
);

ProductsHeader.defaultProps = {
  location: {},
};

const mapStateToProps = (state, props) => ({
  location: Inventory.getCurrentLocation(state, props),
});

// const mapDispatchToProps = {
// };

export default connect(mapStateToProps)(ProductsHeader);
