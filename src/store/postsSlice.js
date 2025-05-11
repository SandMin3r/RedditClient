import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSubredditPosts } from '../api/redditAPI';

export const getSubredditPosts = createAsyncThunk(
  'posts/getSubredditPosts',
  async (subreddit) => {
    return await fetchSubredditPosts(subreddit);
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    isLoading: false,
    hasError: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubredditPosts.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getSubredditPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(getSubredditPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.error = action.error.message;
      });
  }
});

export const selectPosts = (state) => state.posts.posts;
export const selectPostsLoading = (state) => state.posts.isLoading;
export const selectPostsError = (state) => state.posts.hasError;

export default postsSlice.reducer;