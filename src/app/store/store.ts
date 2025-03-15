import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer} from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import likesReducer from './likesSlice';
import characterReducer from './characterSlice';
import statusReducer from './statusSlice';
import cartReducer from './cartSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'], // Only persist 'cart'
};

// Explicitly handle `undefined` for each slice during hydration
const rootReducer = combineReducers({
  likes: likesReducer,
  character: characterReducer,
  status: statusReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

const persistor = persistStore(store);

export default store;
export { persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
