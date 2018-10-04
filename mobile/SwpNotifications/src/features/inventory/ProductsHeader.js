import React from 'react';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import * as R from 'ramda';
import HeaderBackButton from '../../components/HeaderBackButton';
import Inventory, { getLocationIdFromPath } from './selectors';

type Props = {
  // eslint-disable-next-line
  location: {
    moniker: string,
    floor: string,
  },
};

const ProductsHeader = (props : Props) => {
  const location = R.propOr({}, 'location', props);
  return (
    <Header
      leftComponent={<HeaderBackButton />}
      centerComponent={{ text: `${location.moniker} Products` }}
      rightComponent={{ icon: 'sort', color: '#fff' }}
    />
  );
};

const mapStateToProps = (state, props) => ({
  location: Inventory.getCurrentLocation(state, props),
  locationId: getLocationIdFromPath(state, props),
});

export default connect(mapStateToProps)(withNavigation(ProductsHeader));
