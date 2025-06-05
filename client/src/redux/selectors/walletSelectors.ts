import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Sélecteurs pour le slice "wallets".
const selectWalletState = (state: RootState) => state.wallets;

export const selectAllWallets = createSelector(
  [selectWalletState],
  (walletState) => walletState.list
);

export const selectWalletsLoading = createSelector(
  [selectWalletState],
  (walletState) => walletState.loading
);

export const selectWalletsError = createSelector(
  [selectWalletState],
  (walletState) => walletState.error
);
