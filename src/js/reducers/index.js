// -----------------------------------------------------
// Redux Imports
// -----------------------------------------------------

import { combineReducers } from 'redux';
import { createResponsiveStateReducer } from 'redux-responsive';
import { connectRouter } from 'connected-react-router';

import userReducer from 'js/reducers/user';
import carouselReducer from 'js/reducers/carousel';

// -----------------------------------------------------
// Share reducers to application
// -----------------------------------------------------

export default history =>
  combineReducers({
    router: connectRouter(history),
    browser: createResponsiveStateReducer({
      mobile: 767,
      tablet: 1023,
      laptop: 1339,
      desktop: 2559
    }),
    user: userReducer,
    carousel: carouselReducer
  });
