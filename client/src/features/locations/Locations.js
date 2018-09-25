import React, { Component } from 'react';
import { getLocations, deleteLocation } from 'api/actions/locations';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import LocationsPage from './components/LocationsPage';
import locations from './selectors';

class Locations extends Component {
  componentDidMount() {
    if (this.props.locations.length === 0) {
      this.props.getLocations();
    }
  }

  goToNewLocation = () => {
    this.props.push('/locations/new');
  };

  goToLocation = (location) => {
    this.props.push(`/locations/${location.id}`);
  };

  render() {
    return (
      <LocationsPage
        locations={this.props.locations}
        deleteLocation={this.props.deleteLocation}
        getLocations={this.props.getLocations}
        goToLocation={this.goToLocation}
        goToNewLocation={this.goToNewLocation}
      />
    );
  }
}

Locations.propTypes = {
  getLocations: PropTypes.func.isRequired,
  deleteLocation: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      moniker: PropTypes.string,
      floor: PropTypes.string,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  locations: locations.getAll(state),
});
const mapDispatchToProps = dispatch => ({
  getLocations: bindActionCreators(getLocations, dispatch),
  deleteLocation: bindActionCreators(deleteLocation, dispatch),
  push: bindActionCreators(push, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Locations);
