import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Reducers from './Reducers';
import thunk from 'redux-thunk';

const store = createStore(Reducers, composeWithDevTools(applyMiddleware(thunk)));   // or have another option for redux-dev-tools in documentation

export default store;