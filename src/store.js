import { configureStore } from "@reduxjs/toolkit";
import userDetails from "./slices/userDetails";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userDetails);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
