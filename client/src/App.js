import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppRoutes from 'routes';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
// import Disconnected from 'features/connection/Disconnected';
import { Loader } from 'semantic-ui-react';
import ReduxToastr from 'react-redux-toastr';
import {
  Layout, Header, Sidebar, Content,
} from 'Layout';
import { connect } from 'react-redux';
import { disconnect } from 'signalR/actions';
import { push } from 'react-router-redux';
import requests from 'features/requests/selectors';
import messages from 'features/messages/selectors';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { sideMenuIsOpen: false };
  }

  // componentDidMount() {
  //   if (!this.props.connected && !this.props.connecting) {
  //     // this.props.push('/disconnected');
  //   }
  //   // this.props.connectToHub();
  // }

  toggleSidebar = () => {
    this.setState(state => ({ sideMenuIsOpen: !state.sideMenuIsOpen }));
  };

  closeSideBar = () => {
    this.setState({ sideMenuIsOpen: false });
  };

  render() {
    return (
      <Layout>
        <Header disconnect={this.props.disconnect} toggleSidebar={this.toggleSidebar} />
        <Sidebar
          isOpen={this.state.sideMenuIsOpen}
          closeSideBar={this.closeSideBar}
          requestCount={this.props.requestCount}
          messageCount={this.props.messageCount}
        />
        <Content onClick={this.closeSideBar}>
          <AppRoutes />
        </Content>
        <Loader size="huge" active={this.props.loading} />
        <ReduxToastr
          newestOnTop
          timeOut={4000}
          position="bottom-center"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          closeOnToastrClick
        />
      </Layout>
    );
  }
}

App.propTypes = {
  disconnect: PropTypes.func.isRequired,
  connected: PropTypes.bool.isRequired,
  requestCount: PropTypes.number.isRequired,
  messageCount: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loading: state.loading,
  router: state.router,
  connected: state.connection.connected,
  connecting: state.connection.connecting,
  requestCount: requests.getActive(state).length,
  messageCount: messages.getRecieved(state).length,
});

const mapDispatchToProps = dispatch => ({
  disconnect: bindActionCreators(disconnect, dispatch),
  push: bindActionCreators(push, dispatch),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
