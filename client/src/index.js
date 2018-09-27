import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import configureStore, { history } from 'store/configureStore';
import App from 'App';
import Settings from 'features/settings/Settings';
import EnsureConnectedHoc from 'connection/EnsureConnectedHoc';
import Connect from 'connection/Connect';
import 'semantic-ui-css/semantic.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const { persistor, store } = configureStore();
const theme = {
  dark1: '#282639',
  dark2: '#302D43',
  light1: '#EAEDF3',
  light2: '#F4F6F9',
  accent: '#314CB6',
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate onBeforeLift={null} loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/disconnected" exact component={Connect} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/" component={EnsureConnectedHoc(App)} />
          </Switch>
        </ConnectedRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
