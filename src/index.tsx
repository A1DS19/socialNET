import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-calendar/dist/Calendar.css';
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
import { verifyAuth } from './actions/auth';

const composeEnhancers = composeWithDevTools({});
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
//verificar auth
store.dispatch(verifyAuth() as any);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
