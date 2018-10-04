import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { updateSettings, resetSettings } from './actions';
import SettingsForm from './components/SettingsForm';

type Props = {
  settings: {
    server: string,
  },
  saveSettings: Function,
  reset: Function,
  goBack: Function,

};
const Settings = ({
  saveSettings,
  settings,
  reset,
  goBack,
}: Props) => (
  <SettingsForm
    saveSettings={saveSettings}
    goBack={goBack}
    reset={reset}
    initialValues={settings}
    settings={settings}
  />
);

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  goBack: bindActionCreators(NavigationActions.back, dispatch),
  saveSettings: bindActionCreators(updateSettings, dispatch),
  reset: bindActionCreators(resetSettings, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
