// ------------------------------------------------------
// Redux Imports
// ------------------------------------------------------

import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { responsiveStoreEnhancer } from 'redux-responsive';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';

// ------------------------------------------------------
// Reducers Imports
// ------------------------------------------------------

import reducers from 'js/reducers/index';

// ------------------------------------------------------
// Create Redux Logger Middleware to show
// the actions on Console of Developer Tools
// ------------------------------------------------------

const loggerMiddleware = createLogger({
  collapsed: true
});

// ------------------------------------------------------
// Export Store Configuration
// ------------------------------------------------------

export default function configureStore(history, initialState) {
  if (process.env.NODE_ENV == 'development') {
    const store = createStore(
      reducers(history),
      initialState,
      compose(
        responsiveStoreEnhancer,
        applyMiddleware(thunkMiddleware, loggerMiddleware, routerMiddleware(history)),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    );

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('../reducers/index', () => {
        const nextRootReducer = require('../reducers/index');
        store.replaceReducer(nextRootReducer);
      });
    }

    return store;
  } else {
    return createStore(
      reducers,
      initialState,
      compose(
        responsiveStoreEnhancer,
        applyMiddleware(thunkMiddleware, routerMiddleware(history))
      )
    );
  }
}
