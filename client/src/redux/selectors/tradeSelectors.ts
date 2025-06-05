// src/redux/selectors/tradeSelectors.ts

import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

/**
 * Sélecteurs pour la slice "trades".
 */
const selectTradeState = (state: RootState) => state.trades;

export const selectAllTrades = createSelector(
  [selectTradeState],
  (tradeState) => tradeState.list
);

export const selectTradesLoading = createSelector(
  [selectTradeState],
  (tradeState) => tradeState.loading
);

export const selectTradesError = createSelector(
  [selectTradeState],
  (tradeState) => tradeState.error
);
