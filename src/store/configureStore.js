import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk' // <-- добавили redux-thunk
import createLogger from 'redux-logger' // внешний "удобный" логер логер
//import { ping } from './enhancers/ping' // свой логер
import { routerMiddleware, push } from 'react-router-redux'
import { browserHistory } from 'react-router'
const middlewareT = routerMiddleware(browserHistory);

export default function configureStore(initialState) {
  const logger = createLogger();
  const store = createStore(
    rootReducer,
    initialState,
    //applyMiddleware(ping)) // <!-- добавляем его в цепочку middleware'ов (усилители)
    applyMiddleware(thunk, logger, middlewareT));//

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
