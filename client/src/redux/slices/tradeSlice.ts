// src/redux/slices/tradeSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ENDPOINTS } from "../../constants/ApiConstant";
import type { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";

/**
 * Représente une transaction (Trade) telle qu’exposée par le backend.
 */
export interface Trade {
  trade_id: number;
  holding_id: number;
  crypto_symbol: string;
  type: "buy" | "sell";
  amount: number;
  price: number;
  fee: number;
  timestamp: string;
}

/**
 * Structure du state pour la slice "trades".
 */
interface TradeState {
  list: Trade[];
  loading: boolean;
  error: string | null;
}

const initialState: TradeState = {
  list: [],
  loading: false,
  error: null,
};

/**
 * Thunk asynchrone pour récupérer toutes les transactions.
 */
export const fetchTrades = createAsyncThunk<Trade[], void, { state: RootState }>(
  "trades/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Trade[]>(ENDPOINTS.TRADES);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Erreur lors de la récupération des trades");
    }
  }
);

const tradeSlice = createSlice({
  name: "trades",
  initialState,
  reducers: {
    clearTrades: (state) => {
      state.list = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrades.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrades.fulfilled, (state, action: PayloadAction<Trade[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearTrades } = tradeSlice.actions;
export default tradeSlice.reducer;
