import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import threadReducer, {
  asyncFetchThreads,
  asyncCreateThread,
  asyncAddComment,
} from './threadSlice';
import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

describe('threadSlice reducer', () => {
  const initialState = {
    threads: [],
    detailThread: null,
    error: null,
  };

  it('should return the initial state when given by unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const state = threadReducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('should handle asyncFetchThreads.fulfilled', () => {
    const fakeThreads = [{ id: 1, title: 'Thread 1' }, { id: 2, title: 'Thread 2' }];
    const action = { type: asyncFetchThreads.fulfilled.type, payload: fakeThreads };
    const state = threadReducer(initialState, action);
    expect(state.threads).toEqual(fakeThreads);
    expect(state.error).toBe(null);
  });

  it('should handle asyncFetchThreads.rejected', () => {
    const action = { type: asyncFetchThreads.rejected.type, payload: 'Error fetch threads' };
    const state = threadReducer(initialState, action);
    expect(state.threads).toEqual([]);
    expect(state.error).toBe('Error fetch threads');
  });

  it('should handle asyncCreateThread.fulfilled', () => {
    const fakeNewThread = { id: 3, title: 'Thread 3' };
    const action = { type: asyncCreateThread.fulfilled.type, payload: fakeNewThread };
    const state = threadReducer(initialState, action);
    expect(state.threads).toEqual([fakeNewThread]);
    expect(state.error).toBe(null);
  });
  
  it('should handle asyncAddComment.fulfilled when detailThread is present', () => {
    const currentState = {
      ...initialState,
      detailThread: { id: 1, title: 'Thread 1', comments: [] }
    };
    const fakeNewComment = { id: 1, content: 'Comment 1' };
    const action = { type: asyncAddComment.fulfilled.type, payload: fakeNewComment };
    const state = threadReducer(currentState, action);
    expect(state.detailThread.comments).toEqual([fakeNewComment]);
  });
});

describe('threadSlice thunks', () => {
  let dispatch;
  let getState;

  beforeEach(() => {
    dispatch = vi.fn();
    getState = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('asyncFetchThreads', () => {
    it('should dispatch action correctly when fetching threads is successful', async () => {
      const fakeThreadsResponse = [{ id: 1, ownerId: 'user-1', title: 'Thread 1' }];
      const fakeUsersResponse = [{ id: 'user-1', name: 'John Doe' }];
      const expectedPayload = [{ ...fakeThreadsResponse[0], creator: fakeUsersResponse[0] }];
      
      api.getAllThreads = vi.fn().mockResolvedValue(fakeThreadsResponse);
      api.getAllUsers = vi.fn().mockResolvedValue(fakeUsersResponse);

      const action = asyncFetchThreads();
      const result = await action(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getAllThreads).toHaveBeenCalled();
      expect(api.getAllUsers).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      
      expect(result.type).toBe(asyncFetchThreads.fulfilled.type);
      expect(result.payload).toEqual(expectedPayload);
    });

    it('should dispatch action correctly when fetching threads fails', async () => {
      api.getAllThreads = vi.fn().mockRejectedValue(new Error('Network Error'));
      api.getAllUsers = vi.fn().mockResolvedValue([]); // Won't be reached but mocked for safety

      const action = asyncFetchThreads();
      const result = await action(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getAllThreads).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      
      expect(result.type).toBe(asyncFetchThreads.rejected.type);
      expect(result.payload).toBe('Network Error');
    });
  });

  describe('asyncCreateThread', () => {
    it('should dispatch action correctly when creating thread is successful', async () => {
      const fakeNewThread = { id: 1, title: 'Thread 1', body: 'Body', category: 'General' };
      api.createThread = vi.fn().mockResolvedValue(fakeNewThread);

      const action = asyncCreateThread({ title: 'Thread 1', body: 'Body', category: 'General' });
      const result = await action(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.createThread).toHaveBeenCalledWith({ title: 'Thread 1', body: 'Body', category: 'General' });
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      
      expect(result.type).toBe(asyncCreateThread.fulfilled.type);
      expect(result.payload).toEqual(fakeNewThread);
    });
  });
});
