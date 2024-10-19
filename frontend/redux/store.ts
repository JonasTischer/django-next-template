import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './services/apiSlice';
import authReducer from './features/authSlice';
import { loadState, saveState } from './localStorage'; // Import the utility functions

export const makeStore = () => {
  let preloadedState; // Load any saved state

  const store = configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    preloadedState, // Pass the loaded state
    devTools: process.env.NODE_ENV !== 'production',
  });

  store.subscribe(() => {
    saveState(store.getState()); // Save the current state to local storage
  });

  return store;
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
