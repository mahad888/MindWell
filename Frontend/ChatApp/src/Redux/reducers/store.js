import { createStore, combineReducers } from 'redux';
import jsonReducer from './reducer';

// If you plan to have more reducers in the future, you can use combineReducers
const rootReducer = combineReducers({
  data: jsonReducer, // You can add more reducers here if needed
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Enables Redux DevTools
);

export default store;
