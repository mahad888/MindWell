import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import api from "./api";
import miscSlice from "./reducers/misc";
import chatSlice from "./reducers/chat";
import jsonReducer from "./reducers/reducer";
//import jsonReducer from ''; // Assuming you have the original jsonReducer

// Combine all the reducers
const rootReducer = combineReducers({
  data: jsonReducer, // Original reducer
  [authSlice.name]: authSlice.reducer, // Auth slice
  [api.reducerPath]: api.reducer, // API slice for RTK query
  [miscSlice.name]: miscSlice.reducer, // Misc slice
  [chatSlice.name]: chatSlice.reducer, // Chat slice
});

// Configure the store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) => [
    ...defaultMiddleware(), // Default middleware (thunk, serializableCheck, etc.)
    api.middleware, // Middleware for RTK query
  ],
  devTools: process.env.NODE_ENV !== 'production', // Enables Redux DevTools in non-production mode
});

export default store;
