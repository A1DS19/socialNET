import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { reducers } from './reducers/index';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { ScrollToTop } from './scripts/scrollToTop';
import { App } from './components/App';

const composeEnhancers = composeWithDevTools({});
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
