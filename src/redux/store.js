import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import defaultState from './state';
import reducer from './reducer';

export default createStore(reducer, defaultState, applyMiddleware(thunk));
