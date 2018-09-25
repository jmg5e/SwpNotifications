import React from 'react';
import Page from 'components/Page';
// import PropTypes from 'prop-types';

const HomePage = () => (
  <Page.Layout>
    <Page.Header>Home</Page.Header>
    <Page.Main>
      <p>
        try logging as: user/admin | Passw0rd!
      </p>
    </Page.Main>
  </Page.Layout>
);

// HomePage.defaultProps = {};
//
// HomePage.propTypes = {};

export default HomePage;
