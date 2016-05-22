import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import './styles/app.css'
import configureStore from './store/configureStore'
//------------------------------------------------------------
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, Route, browserHistory } from 'react-router'
import routes from './routes';

const store = configureStore();
const  history = syncHistoryWithStore(browserHistory, store);
export default history;
    render(
  <Provider store={store}>
        <div className='app'>
            <Router history={history} routes={routes} />
        </div>
  </Provider>,
  document.getElementById('root')
)
