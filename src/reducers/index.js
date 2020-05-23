import { combineReducers } from 'redux';
import sort from './sortReducer';

const rootReducer = combineReducers({
  sort,
});

export default rootReducer;
