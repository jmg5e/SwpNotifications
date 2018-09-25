import React from 'react';
import PropTypes from 'prop-types';
import * as Page from 'components/Page';
import LocationForm from './LocationForm';

const NewLocationPage = props => (
  <Page.Layout>
    <Page.Header>New Location</Page.Header>
    <Page.Main>
      <LocationForm
        onSubmit={props.createLocation}
        handleCancel={props.goBack}
      />
    </Page.Main>
  </Page.Layout>
);

NewLocationPage.propTypes = {
  createLocation: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default NewLocationPage;
