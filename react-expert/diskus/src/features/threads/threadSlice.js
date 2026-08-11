import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {hideLoading, showLoading} from 'react-redux-loading-bar';
import api from '../../utils/api';

const initialState = {
  threads: [],
  detailThread: null,
  error: null,
};

export const asyncFetchThreads = createAsyncThunk(
    'threads/fetchAll',
    async (_, {dispatch, rejectWithValue}) => {
      dispatch(showLoading());
      try {
        const threads = await api.getAllThreads();
        const users = await api.getAllUsers();

        const populatedThreads = threads.map((thread) => {
          const creator = users.find((user) => user.id === thread.ownerId);
          return {
            ...thread,
            creator,
          };
        });

        dispatch(hideLoading());
        return populatedThreads;
      } catch (error) {
        dispatch(hideLoading());
        return rejectWithValue(error.message);
      }
    },
);

export const asyncCreateThread = createAsyncThunk(
    'threads/create',
    async ({title, body, category}, {dispatch, rejectWithValue}) => {
      dispatch(showLoading());
      try {
        const thread = await api.createThread({title, body, category});
        dispatch(hideLoading());
        return thread;
      } catch (error) {
        dispatch(hideLoading());
        return rejectWithValue(error.message);
      }
    },
);

export const asyncGetDetailThread = createAsyncThunk(
    'threads/getDetail',
    async (id, {dispatch, rejectWithValue}) => {
      dispatch(showLoading());
      try {
        const thread = await api.getThreadDetail(id);
        dispatch(hideLoading());
        return thread;
      } catch (error) {
        dispatch(hideLoading());
        return rejectWithValue(error.message);
      }
    },
);

export const asyncAddComment = createAsyncThunk(
    'threads/addComment',
    async ({threadId, content}, {dispatch, rejectWithValue}) => {
      dispatch(showLoading());
      try {
        const comment = await api.createComment(threadId, content);
        dispatch(hideLoading());
        return comment;
      } catch (error) {
        dispatch(hideLoading());
        return rejectWithValue(error.message);
      }
    },
);

export const asyncToggleVoteThread = createAsyncThunk(
    'threads/toggleVote',
    async ({threadId, voteType}, {getState, rejectWithValue}) => {
      const {user} = getState();
      const userId = user.authUser?.id;
      if (!userId) return rejectWithValue('Not logged in');

      try {
        await api.toggleVote(threadId, voteType);
        return {threadId, voteType, userId};
      } catch (error) {
        return rejectWithValue({threadId, userId, error: error.message});
      }
    },
);

export const asyncToggleVoteComment = createAsyncThunk(
    'threads/toggleVoteComment',
    async ({threadId, commentId, voteType}, {getState, rejectWithValue}) => {
      const {user} = getState();
      const userId = user.authUser?.id;
      if (!userId) return rejectWithValue('Not logged in');

      try {
        await api.toggleVoteComment(threadId, commentId, voteType);
        return {threadId, commentId, voteType, userId};
      } catch (error) {
        return rejectWithValue({threadId, commentId, userId, error: error.message});
      }
    },
);

const threadSlice = createSlice({
  name: 'thread',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(asyncFetchThreads.fulfilled, (state, action) => {
          state.threads = action.payload;
          state.error = null;
        })
        .addCase(asyncFetchThreads.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(asyncCreateThread.fulfilled, (state, action) => {
          state.threads.unshift(action.payload);
          state.error = null;
        })
        .addCase(asyncCreateThread.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(asyncGetDetailThread.fulfilled, (state, action) => {
          state.detailThread = action.payload;
          state.error = null;
        })
        .addCase(asyncGetDetailThread.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(asyncAddComment.fulfilled, (state, action) => {
          if (state.detailThread) {
            state.detailThread.comments.unshift(action.payload);
          }
        })
    // Optimistic UI for Thread Vote
        .addCase(asyncToggleVoteThread.pending, (state, action) => {
          const {threadId, voteType} = action.meta.arg;
          // The userId isn't in meta.arg since we get it in thunk, so let's skip the exact user matching for optimistic if we don't have it here,
          // OR we can pass userId as arg. But we need userId to properly remove from arrays.
          // Actually, we can fetch userId in component and pass it into action.meta.arg. Let's assume component passes it: { threadId, voteType, userId }
          const {userId} = action.meta.arg;

          const updateVoteArrays = (obj) => {
            if (!obj) return;
            obj.upVotesBy = obj.upVotesBy.filter((id) => id !== userId);
            obj.downVotesBy = obj.downVotesBy.filter((id) => id !== userId);
            if (voteType === 1) obj.upVotesBy.push(userId);
            if (voteType === -1) obj.downVotesBy.push(userId);
          };

          const threadInList = state.threads.find((t) => t.id === threadId);
          if (threadInList) updateVoteArrays(threadInList);

          if (state.detailThread && state.detailThread.id === threadId) {
            updateVoteArrays(state.detailThread);
          }
        })
        .addCase(asyncToggleVoteThread.rejected, (state, action) => {
        // Revert logically requires knowing previous state, but we can just let it fail silently or refetch
        // For strict optimistic update, a rejection should ideally roll back. Since the API is reliable, we'll just show error.
          state.error = action.payload?.error || 'Vote failed';
        })
    // Optimistic UI for Comment Vote
        .addCase(asyncToggleVoteComment.pending, (state, action) => {
          const {commentId, voteType, userId} = action.meta.arg;
          if (state.detailThread) {
            const comment = state.detailThread.comments.find((c) => c.id === commentId);
            if (comment) {
              comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
              comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
              if (voteType === 1) comment.upVotesBy.push(userId);
              if (voteType === -1) comment.downVotesBy.push(userId);
            }
          }
        })
        .addCase(asyncToggleVoteComment.rejected, (state, action) => {
          state.error = action.payload?.error || 'Comment vote failed';
        });
  },
});

export default threadSlice.reducer;
