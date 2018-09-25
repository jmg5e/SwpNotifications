import React from 'react';
import PropTypes from 'prop-types';
import {
  Header, Segment, Grid, Icon,
} from 'semantic-ui-react';
import SettingsForm from './SettingsForm';

const SettingsPage = ({
  settings,
  updateSettings,
  resetSettings,
  clearCache,
  goBack,
}) => (
  <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" icon>
        <Icon name="settings" />
      App Settings
        <Header.Subheader>Manage app settings.</Header.Subheader>
      </Header>
      <Segment.Group raised>
        <SettingsForm
          initialValues={settings}
          onSubmit={(result) => {
            updateSettings(result);
            goBack();
          }}
          clearCache={clearCache}
          resetSettings={resetSettings}
          handleCancel={goBack}
        />
      </Segment.Group>
    </Grid.Column>
  </Grid>
);

SettingsPage.propTypes = {
  settings: PropTypes.shape({
    server: PropTypes.string,
  }).isRequired,
  updateSettings: PropTypes.func.isRequired,
  resetSettings: PropTypes.func.isRequired,
  clearCache: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default SettingsPage;
