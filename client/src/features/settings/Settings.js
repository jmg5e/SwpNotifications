import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { updateSettings, resetSettings } from './actions';
import SettingsPage from './components/SettingsPage';

class Settings extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
      }).isRequired,
      staticContext: PropTypes.object,
    }).isRequired,
  };

  clearCache = () => {
    localStorage.clear();
    window.location.reload();
  };

  goBack = () => {
    // TODO learn more about context and why goBack() fails
    if (this.context.router.history.length > 0) {
      this.context.router.history.goBack();
    } else {
      this.context.router.history.push('/');
    }
  };

  render() {
    return (
      <SettingsPage
        settings={this.props.settings}
        updateSettings={this.props.updateSettings}
        resetSettings={this.props.resetSettings}
        goBack={this.goBack}
        clearCache={this.clearCache}
      />
    );
  }
}

Settings.propTypes = {
  resetSettings: PropTypes.func.isRequired,
  updateSettings: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    server: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  settings: state.settings,
  router: state.router,
});

const mapDispatchToProps = dispatch => ({
  updateSettings: bindActionCreators(updateSettings, dispatch),
  resetSettings: bindActionCreators(resetSettings, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
