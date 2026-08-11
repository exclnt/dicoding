import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {hideLoading, showLoading} from 'react-redux-loading-bar';
import api from '../../utils/api';

const initialState = {
  leaderboards: [],
  error: null,
};

export const asyncFetchLeaderboards = createAsyncThunk(
    'leaderboards/fetchAll',
    async (_, {dispatch, rejectWithValue}) => {
      dispatch(showLoading());
      try {
        const leaderboards = await api.getLeaderboards();
        dispatch(hideLoading());
        return leaderboards;
      } catch (error) {
        dispatch(hideLoading());
        return rejectWithValue(error.message);
      }
    },
);

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(asyncFetchLeaderboards.fulfilled, (state, action) => {
          state.leaderboards = action.payload;
          state.error = null;
        })
        .addCase(asyncFetchLeaderboards.rejected, (state, action) => {
          state.error = action.payload;
        });
  },
});

export default leaderboardSlice.reducer;
