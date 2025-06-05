// src/redux/slices/walletSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ENDPOINTS } from "../../constants/ApiConstant";
import type { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";

/**
 * Représente un portefeuille utilisateur tel qu’exposé par le backend.
 */
export interface Wallet {
  wallet_id: number;
  initial_balance: number;
  created_at: string;
  user_id: number;
}

/**
 * Structure du state pour la slice "wallets".
 */
interface WalletState {
  list: Wallet[];
  loading: boolean;
  error: string | null;
}

const initialState: WalletState = {
  list: [],
  loading: false,
  error: null,
};

/**
 * Thunk asynchrone pour récupérer tous les portefeuilles de l’utilisateur connecté.
 * Le backend renvoie un tableau de Wallet au format JSON.
 */
export const fetchWallets = createAsyncThunk<Wallet[], void, { state: RootState }>(
  "wallets/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Wallet[]>(ENDPOINTS.WALLETS);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Erreur lors de la récupération des wallets");
    }
  }
);

const walletSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {
    clearWallets: (state) => {
      state.list = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWallets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWallets.fulfilled, (state, action: PayloadAction<Wallet[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchWallets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearWallets } = walletSlice.actions;
export default walletSlice.reducer;
