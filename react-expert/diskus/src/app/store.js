import {configureStore} from '@reduxjs/toolkit';
import {loadingBarReducer} from 'react-redux-loading-bar';
import userReducer from '../features/auth/userSlice';
import threadReducer from '../features/threads/threadSlice';
import leaderboardReducer from '../features/leaderboards/leaderboardSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    thread: threadReducer,
    leaderboard: leaderboardReducer,
    loadingBar: loadingBarReducer,
  },
});
