import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice'; // If you have a cart reducer
import bannerReducer from './slices/bannerSlice'; // Add this line

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth', 'banners'] // Add banners to whitelist
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer, // If you have a cart reducer
  banners: bannerReducer, // Add this line
  // other reducers...
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store); 