import React from 'react';
import { goBack } from 'react-router-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createLocation } from 'api/actions/locations';
import NewLocationPage from './components/NewLocationPage';

const NewLocation = props => (
  <NewLocationPage
    goBack={props.goBack}
    createLocation={props.createLocation}
  />
);

NewLocation.propTypes = {
  createLocation: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.loading,
});

const mapDispatchToProps = {
  createLocation,
  goBack,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewLocation);
