import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {hideLoading, showLoading} from 'react-redux-loading-bar';
import api from '../../utils/api';

const initialState = {
  authUser: null,
  isPreload: true,
  error: null,
};

export const asyncRegisterUser = createAsyncThunk(
    'users/register',
    async ({name, email, password}, {dispatch, rejectWithValue}) => {
      dispatch(showLoading());
      try {
        const user = await api.register({name, email, password});
        dispatch(hideLoading());
        return user;
      } catch (error) {
        dispatch(hideLoading());
        return rejectWithValue(error.message);
      }
    },
);

export const asyncLoginUser = createAsyncThunk(
    'users/login',
    async ({email, password}, {dispatch, rejectWithValue}) => {
      dispatch(showLoading());
      try {
        const token = await api.login({email, password});
        api.putAccessToken(token);
        dispatch(asyncGetOwnProfile());
        dispatch(hideLoading());
        return token;
      } catch (error) {
        dispatch(hideLoading());
        return rejectWithValue(error.message);
      }
    },
);

export const asyncGetOwnProfile = createAsyncThunk(
    'users/getProfile',
    async (_, {dispatch, rejectWithValue}) => {
      dispatch(showLoading());
      try {
        const authUser = await api.getOwnProfile();
        dispatch(hideLoading());
        return authUser;
      } catch (error) {
        api.putAccessToken(''); // clear invalid token
        dispatch(hideLoading());
        return rejectWithValue(error.message);
      }
    },
);

export const asyncLogoutUser = createAsyncThunk(
    'users/logout',
    async (_, {dispatch}) => {
      dispatch(showLoading());
      api.putAccessToken('');
      dispatch(hideLoading());
      return null;
    },
);


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(asyncGetOwnProfile.pending, (state) => {
          state.isPreload = true;
        })
        .addCase(asyncGetOwnProfile.fulfilled, (state, action) => {
          state.authUser = action.payload;
          state.isPreload = false;
          state.error = null;
        })
        .addCase(asyncGetOwnProfile.rejected, (state, action) => {
          state.authUser = null;
          state.isPreload = false;
          state.error = action.payload;
        })
        .addCase(asyncLogoutUser.fulfilled, (state) => {
          state.authUser = null;
        });
  },
});

export default userSlice.reducer;
