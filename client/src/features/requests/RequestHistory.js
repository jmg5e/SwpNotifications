import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  clearHistory,
} from './actions';
import RequestHistory from './components/RequestHistory';
import requests from './selectors';

const RequestHistoryContainer = props => (
  <RequestHistory
    requestHistory={props.requestHistory}
    clearHistory={props.clearHistory}
  />
);

RequestHistoryContainer.propTypes = {
  clearHistory: PropTypes.func.isRequired,
  requestHistory: PropTypes.arrayOf(PropTypes.shape({
    eventId: PropTypes.string,
    ids: PropTypes.arrayOf(PropTypes.number),
    products: PropTypes.arrayOf(PropTypes.object),
  })).isRequired,
};

const mapStateToProps = state => ({
  requestHistory: requests.getHistory(state),
});

const mapDispatchToProps = {
  clearHistory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestHistoryContainer);
