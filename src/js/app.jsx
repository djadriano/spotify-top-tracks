import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import 'styles/index.scss';

import App from './layouts/layout';

import configureStore from 'js/stores/configure';

const history = createHistory({
  basename: '',
  forceRefresh: false
});

const store = configureStore(history);

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.querySelector('.spfy-main')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./layouts/layout', () => {
    const nextApp = require('./layouts/layout').default;
    render(nextApp);
  });
}
