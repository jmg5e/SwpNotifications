import React from 'react';
import Page from 'components/Page';
// import PropTypes from 'prop-types';

const NotAuthorized = () => (
  <Page.Layout>
    <Page.Main>
      <p>
        Woops you dont have permission to view this content
      </p>
    </Page.Main>
  </Page.Layout>
);

// HomePage.defaultProps = {};
//
// HomePage.propTypes = {};

export default NotAuthorized;
