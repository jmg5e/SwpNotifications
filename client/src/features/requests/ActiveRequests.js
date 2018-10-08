import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setRequestsEllapsedTime } from 'utils/ellapsedTime';
import {
  getRequests,
  clearRequests,
  dismissRequest,
} from 'signalR/actions';
import ActiveRequests from './components/ActiveRequests';
import requests from './selectors';

class ActiveRequestsContainer extends Component {
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
      <ActiveRequests
        className="ActiveRequests"
        requests={this.state.activeRequests}
        clearRequests={this.props.clearRequests}
        getRequests={this.props.getRequests}
        dismissRequest={this.props.dismissRequest}
      />
    );
  }
}

ActiveRequestsContainer.propTypes = {
  getRequests: PropTypes.func.isRequired,
  clearRequests: PropTypes.func.isRequired,
  dismissRequest: PropTypes.func.isRequired,
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveRequestsContainer);
