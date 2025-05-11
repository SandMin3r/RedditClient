// postsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSubredditPosts, searchPosts } from '../api/redditAPI';

export const getSubredditPosts = createAsyncThunk(
  'posts/getSubredditPosts',
  async (subreddit) => {
    return await fetchSubredditPosts(subreddit);
  }
);

export const searchRedditPosts = createAsyncThunk(
  'posts/searchRedditPosts',
  async (query) => {
    return await searchPosts(query);
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    currentSubreddit: 'AskReddit',
    searchQuery: '',
    isLoading: false,
    hasError: false,
    error: null
  },
  reducers: {
    clearPosts(state) {
      state.posts = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubredditPosts.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.searchQuery = '';
      })
      .addCase(getSubredditPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
        state.currentSubreddit = action.meta.arg;
      })
      .addCase(getSubredditPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.error = action.error.message;
      })
      .addCase(searchRedditPosts.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.currentSubreddit = 'Search Results';
      })
      .addCase(searchRedditPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
        state.searchQuery = action.meta.arg;
      })
      .addCase(searchRedditPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.error = action.error.message;
      });
  }
});

export const { clearPosts } = postsSlice.actions;
export const selectAllPosts = (state) => state.posts.posts;
export const selectCurrentSubreddit = (state) => state.posts.currentSubreddit;
export const selectSearchQuery = (state) => state.posts.searchQuery;
export const selectPostsLoading = (state) => state.posts.isLoading;
export const selectPostsError = (state) => state.posts.hasError;

export default postsSlice.reducer;