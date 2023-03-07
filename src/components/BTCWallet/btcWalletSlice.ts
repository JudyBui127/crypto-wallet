import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import BlockInfoAPIs from "../../api/blockchainAPIs";

export interface WalletInfo {
  id: string;
  final_balance: number;
  n_tx: number;
  total_received: number;
}
const walletsAdapter = createEntityAdapter();
const initialState = walletsAdapter.getInitialState({
  status: "idle",
  error: null,
});

// Thunk function

export const getWalletAsync = createAsyncThunk(
  "wallets/getAllWallets",
  async (addresses: string[]) => {
    return await BlockInfoAPIs.getBalance(addresses);
  }
);

const setLoading = (state) => {
  state.status = "loading";
};
function setData(state, action) {
  const { data, error, message } = action.payload;
  if (data) {
    state.status = "succeeded";
    state.entities = {...state.entities, ...data}
    state.ids = [...state.ids, Object.keys(data)[0]]
  } else if (error) {
    state.status = "failed";
    state.error = { error, message };
  }
}

export const btcWalletSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {
    updateWallets: walletsAdapter.upsertOne,
  },
  extraReducers: {
    [getWalletAsync.pending.type]: setLoading,
    [getWalletAsync.fulfilled.type]: (state, action) => {
      setData(state, action)
    },
  },
});

export const btcWalletReducer = btcWalletSlice.reducer;
export const walletInfoSelector = (state) => state.wallets.entities