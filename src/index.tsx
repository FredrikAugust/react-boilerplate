import React from 'react';
import ReactDOM from 'react-dom';

// Stylesheet/reset imports
import './index.scss';
import CssBaseline from '@material-ui/core/CssBaseline';

// Component imports
import Router from './components/organisms/Router';

// Router imports
import { BrowserRouter } from 'react-router-dom';

// Redux imports
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

// Import slices
import authSlice from './reducers/auth';

// Import sagas
import authSaga from './sagas/auth';

// Setup middlewares
const sagaMiddleware = createSagaMiddleware();

// Import slices here to generate root reducer
const reducerMapObject = {
  // We can't use [authSlice.name] as TS isn't smart enough to understand that that is a constand and not a string
  auth: authSlice.reducer,
};

const rootReducer = combineReducers(reducerMapObject);

export type Store = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// Run sagas
sagaMiddleware.run(authSaga);

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <Provider store={store}>
        <Router />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
