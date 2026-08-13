import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import userReducer, {
  asyncGetOwnProfile,
  asyncLoginUser,
  asyncRegisterUser,
  asyncLogoutUser
} from './userSlice';
import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

describe('userSlice reducer', () => {
  const initialState = {
    authUser: null,
    isPreload: true,
    error: null,
  };

  it('should return the initial state when given by unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const state = userReducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('should handle asyncGetOwnProfile.pending', () => {
    const action = { type: asyncGetOwnProfile.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isPreload).toBe(true);
  });

  it('should handle asyncGetOwnProfile.fulfilled', () => {
    const fakeUser = { id: 1, name: 'Test User' };
    const action = { type: asyncGetOwnProfile.fulfilled.type, payload: fakeUser };
    const state = userReducer(initialState, action);
    expect(state.authUser).toEqual(fakeUser);
    expect(state.isPreload).toBe(false);
    expect(state.error).toBe(null);
  });

  it('should handle asyncGetOwnProfile.rejected', () => {
    const action = { type: asyncGetOwnProfile.rejected.type, payload: 'Error' };
    const state = userReducer(initialState, action);
    expect(state.authUser).toBe(null);
    expect(state.isPreload).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('should handle asyncLogoutUser.fulfilled', () => {
    const currentState = {
      authUser: { id: 1, name: 'Test User' },
      isPreload: false,
      error: null,
    };
    const action = { type: asyncLogoutUser.fulfilled.type };
    const state = userReducer(currentState, action);
    expect(state.authUser).toBe(null);
  });
});

describe('userSlice thunks', () => {
  let dispatch;
  let getState;

  beforeEach(() => {
    dispatch = vi.fn();
    getState = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('asyncGetOwnProfile', () => {
    it('should dispatch action correctly when fetching profile is successful', async () => {
      const fakeUser = { id: 1, name: 'Test User' };
      api.getOwnProfile = vi.fn().mockResolvedValue(fakeUser);

      const action = asyncGetOwnProfile();
      const result = await action(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getOwnProfile).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      
      expect(result.type).toBe(asyncGetOwnProfile.fulfilled.type);
      expect(result.payload).toEqual(fakeUser);
    });

    it('should dispatch action correctly when fetching profile fails', async () => {
      api.getOwnProfile = vi.fn().mockRejectedValue(new Error('Network Error'));
      api.putAccessToken = vi.fn();

      const action = asyncGetOwnProfile();
      const result = await action(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getOwnProfile).toHaveBeenCalled();
      expect(api.putAccessToken).toHaveBeenCalledWith('');
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      
      expect(result.type).toBe(asyncGetOwnProfile.rejected.type);
      expect(result.payload).toBe('Network Error');
    });
  });

  describe('asyncLoginUser', () => {
    it('should dispatch action correctly when login is successful', async () => {
      const fakeToken = 'fake-jwt-token';
      api.login = vi.fn().mockResolvedValue(fakeToken);
      api.putAccessToken = vi.fn();

      const action = asyncLoginUser({ email: 'test@test.com', password: 'password' });
      const result = await action(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.login).toHaveBeenCalledWith({ email: 'test@test.com', password: 'password' });
      expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
      
      // Needs to dispatch asyncGetOwnProfile, let's just check it dispatches a function (thunk)
      expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
      
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      
      expect(result.type).toBe(asyncLoginUser.fulfilled.type);
      expect(result.payload).toEqual(fakeToken);
    });

    it('should dispatch action correctly when login fails', async () => {
      api.login = vi.fn().mockRejectedValue(new Error('Invalid Credentials'));

      const action = asyncLoginUser({ email: 'test@test.com', password: 'password' });
      const result = await action(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.login).toHaveBeenCalledWith({ email: 'test@test.com', password: 'password' });
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      
      expect(result.type).toBe(asyncLoginUser.rejected.type);
      expect(result.payload).toBe('Invalid Credentials');
    });
  });
});
