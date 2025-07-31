import { configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import themeReducer from './slices/themeSlice';
import productsReducer from './slices/productsSlice';

/**
 * Redux store configuration
 * Manages global state for theme switching and product data
 */
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serialization checks
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Type-safe useSelector hook
export const useAppSelector = <T>(selector: (state: RootState) => T): T => {
  return useSelector((state: RootState) => selector(state));
}; 