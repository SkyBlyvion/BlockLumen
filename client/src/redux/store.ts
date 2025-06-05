import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./slices/walletSlice";
import tradeReducer from "./slices/tradeSlice";

const store = configureStore({
  reducer: {
    wallets: walletReducer,
    trades: tradeReducer,
  },
});

export default store;

// Définition du type RootState pour utiliser les selectors
export type RootState = ReturnType<typeof store.getState>;

// Définition du type AppDispatch pour utiliser le dispatch dans les composants
export type AppDispatch = typeof store.dispatch;
