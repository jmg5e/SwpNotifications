import React from 'react';
import PropTypes from 'prop-types';
import * as Page from 'components/Page';
import LocationForm from './LocationForm';

const EditLocationPage = props => (
  <Page.Layout>
    <Page.Header>Edit Location</Page.Header>
    <Page.Main>
      <LocationForm
        initialValues={props.location}
        onSubmit={props.updateLocation}
        handleCancel={props.goBack}
      />
    </Page.Main>
  </Page.Layout>
);

EditLocationPage.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.number.isRequired,
    moniker: PropTypes.string.isRequired,
    floor: PropTypes.string,
  }).isRequired,
  updateLocation: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default EditLocationPage;
