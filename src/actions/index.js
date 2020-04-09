const STORE_COLUMN_FILTER = 'STORE_COLUMN_FILTER';
const STORE_COMPARISON_FILTER = 'STORE_COMPARISON_FILTER';
const STORE_VALUE_FILTER = 'STORE_VALUE_FILTER';
const REMOVE_FILTER = 'REMOVE_FILTER';


export const actionColumns = (value, rowIndex) => ({ type: STORE_COLUMN_FILTER, value, rowIndex });
export const actionComparison = (value, rowIndex) => (
  { type: STORE_COMPARISON_FILTER, value, rowIndex });
export const actionValue = (value, rowIndex) => ({ type: STORE_VALUE_FILTER, value, rowIndex });
export const actionRemove = (rowIndex) => ({ type: REMOVE_FILTER, rowIndex });
