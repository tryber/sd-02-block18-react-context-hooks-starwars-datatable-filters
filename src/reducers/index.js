import { combineReducers } from 'redux';
import filters from './filtersReducer';
import sort from './sortReducer';

const rootReducer = combineReducers({
  filters,
  sort,
});

export default rootReducer;
