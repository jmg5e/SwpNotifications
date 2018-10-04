// import PropTypes from 'prop-types';
import { HeaderBackButton, NavigationActions } from 'react-navigation';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


type Props = {
  goBack: Function,
}

const BackButton = (props: Props) => (
  <HeaderBackButton {...props} onPress={props.goBack} />
);

const mapStateToProps = state => state.navigation;

const mapDispatchToProps = dispatch => ({
  goBack: bindActionCreators(NavigationActions.back, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BackButton);
