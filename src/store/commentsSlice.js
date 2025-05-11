import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPostComments } from '../api/redditAPI';

export const getPostComments = createAsyncThunk(
  'comments/getPostComments',
  async ({ subreddit, postId }) => {
    return await fetchPostComments(subreddit, postId);
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    currentPost: null,
    isLoading: false,
    hasError: false,
    error: null
  },
  reducers: {
    clearComments(state) {
      state.comments = [];
      state.currentPost = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostComments.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getPostComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPost = action.payload.post;
        state.comments = action.payload.comments;
      })
      .addCase(getPostComments.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.error = action.error.message;
      });
  }
});

export const { clearComments } = commentsSlice.actions;
export const selectCurrentPost = (state) => state.comments.currentPost;
export const selectComments = (state) => state.comments.comments;
export const selectCommentsLoading = (state) => state.comments.isLoading;

export default commentsSlice.reducer;