import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setRequestsEllapsedTime } from 'utils/ellapsedTime';
import {
  getRequests,
  clearRequests,
  dismissRequest,
} from 'signalR/actions';
import {
  clearHistory,
} from './actions';
import RequestsPage from './components/RequestsPage';
import requests from './selectors';

class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRequests: this.props.activeRequests,
    };
    this.updateElapsedTime = this.updateElapsedTime.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.updateElapsedTime, 60 * 1000);
  }

  componentWillReceiveProps() {
    this.setState((state, props) => ({
      activeRequests: props.activeRequests,
    }));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateElapsedTime() {
    this.setState((state, props) => ({
      activeRequests: setRequestsEllapsedTime(props.activeRequests),
    }));
  }

  render() {
    return (
      <RequestsPage
        activeRequests={this.state.activeRequests}
        requestHistory={this.props.requestHistory}
        dismissRequest={this.props.dismissRequest}
        getRequests={this.props.getRequests}
        clearRequests={this.props.clearRequests}
        clearHistory={this.props.clearHistory}
      />
    );
  }
}

Requests.propTypes = {
  getRequests: PropTypes.func.isRequired,
  clearRequests: PropTypes.func.isRequired,
  dismissRequest: PropTypes.func.isRequired,
  clearHistory: PropTypes.func.isRequired,
  requestHistory: PropTypes.arrayOf(PropTypes.shape({
    eventId: PropTypes.string,
    ids: PropTypes.arrayOf(PropTypes.number),
    products: PropTypes.arrayOf(PropTypes.object),
  })).isRequired,
  activeRequests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      ellapsedTime: PropTypes.number.isRequired,
      product: PropTypes.object.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  activeRequests: setRequestsEllapsedTime(requests.getActive(state)),
  requestHistory: requests.getHistory(state),
});

const mapDispatchToProps = {
  getRequests,
  clearRequests,
  dismissRequest,
  clearHistory,
};
// dispatch => ({
//   getRequests: bindActionCreators(getRequests, dispatch),
//   clearRequests: bindActionCreators(clearRequests, dispatch),
//   deledismissest: bindActionCreators(deleteRequest, dispatch),
//   clearHistory: bindActionCreators(clearHistory, dispatch),
// });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Requests);
