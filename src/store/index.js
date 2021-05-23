import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import mySaga from '../saga'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()
// const composeEnhancer  = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;

export default createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga)
