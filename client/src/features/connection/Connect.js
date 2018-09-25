import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { connectToHub } from 'signalR/actions';
import ConnectPage from './components/ConnectPage';

class Connect extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }

  handleNameChange = ({ target: { value } }) => {
    this.setState({
      name: value,
    });
  };

  connect = () => {
    this.props.connectToHub(this.state.name);
  }

  render() {
    return (
      <ConnectPage
        {...this.props.connection}
        connectToHub={this.connect}
        name={this.state.name}
        handleNameChange={this.handleNameChange}
      />
    );
  }
}

Connect.propTypes = {
  connectToHub: PropTypes.func.isRequired,
  connection: PropTypes.shape({
    connected: PropTypes.bool,
    errorMessage: PropTypes.string,
    connecting: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = state => ({
  connection: state.connection,
});

const mapDispatchToProps = {
  connectToHub,
};

export default connect(mapStateToProps, mapDispatchToProps)(Connect);
