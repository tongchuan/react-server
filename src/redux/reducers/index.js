import {combineReducers} from 'redux';
import {routerReducer } from 'react-router-redux';
import reduxCommon from './reduxCommon';
export default combineReducers({
  router:routerReducer,
  reduxCommon:reduxCommon
});