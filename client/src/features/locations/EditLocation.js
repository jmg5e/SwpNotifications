import React from 'react';
import { updateLocation, deleteLocation } from 'api/actions/locations';
import { goBack } from 'react-router-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditLocationPage from './components/EditLocationPage';
import locations from './selectors';

const EditLocation = props => (
  <EditLocationPage
    location={props.location}
    updateLocation={props.updateLocation}
    deleteLocation={props.deleteLocation}
    goBack={props.goBack}
  />
);

EditLocation.propTypes = {
  updateLocation: PropTypes.func.isRequired,
  deleteLocation: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  location: PropTypes.shape({
    id: PropTypes.number.isRequired,
    moniker: PropTypes.string.isRequired,
    floor: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  location: locations.getById(state, ownProps),
});

const mapDispatchToProps = {
  updateLocation,
  deleteLocation,
  goBack,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditLocation);
