import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestDetails } from '../types';

interface RequestState {
  requests: RequestDetails[];
  total: number;
  currentPage: number;
  pageSize: number;
  loading: boolean;
  error: string | null;
}

const initialState: RequestState = {
  requests: [],
  total: 0,
  currentPage: 1,
  pageSize: 10,
  loading: false,
  error: null,
};

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setRequests: (state: RequestState, action: PayloadAction<{ records: RequestDetails[]; total: number }>) => {
      state.requests = action.payload.records;
      state.total = action.payload.total;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state: RequestState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: RequestState, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setPage: (state: RequestState, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state: RequestState, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.currentPage = 1;
    },
    updateRequest: (state: RequestState, action: PayloadAction<RequestDetails>) => {
      const index = state.requests.findIndex((r: RequestDetails) => r.requestID === action.payload.requestID);
      if (index !== -1) {
        state.requests[index] = action.payload;
      }
    },
    clearRequests: (state: RequestState) => {
      state.requests = [];
      state.total = 0;
      state.currentPage = 1;
      state.error = null;
    },
  },
});

export const { setRequests, setLoading, setError, setPage, setPageSize, updateRequest, clearRequests } = requestSlice.actions;
export default requestSlice.reducer;

