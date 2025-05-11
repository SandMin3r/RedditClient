import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchSubredditPosts,
  fetchPostComments,
  fetchPopularSubreddits,
  searchPosts
} from '../api/redditAPI.js';

export const getSubredditPosts = createAsyncThunk(
  'reddit/getSubredditPosts',
  async (subreddit) => {
    const response = await fetchSubredditPosts(subreddit);
    return response;
  }
);

export const getPostComments = createAsyncThunk(
  'reddit/getPostComments',
  async ({ subreddit, postId }) => {
    const response = await fetchPostComments(subreddit, postId);
    return response;
  }
);

export const getPopularSubreddits = createAsyncThunk(
  'reddit/getPopularSubreddits',
  async () => {
    const response = await fetchPopularSubreddits();
    return response;
  }
);

export const searchRedditPosts = createAsyncThunk(
  'reddit/searchRedditPosts',
  async (query) => {
    const response = await searchPosts(query);
    return response;
  }
);

const redditSlice = createSlice({
  name: 'reddit',
  initialState: {
    posts: [],
    comments: [],
    currentPost: null,
    subreddits: [],
    searchResults: [],
    isLoading: false,
    hasError: false,
    error: null,
    currentSubreddit: '',
  },
  reducers: {
    clearComments(state) {
      state.comments = [];
      state.currentPost = null;
    },
    setCurrentSubreddit: (state, action) => {
      state.currentSubreddit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Posts
      .addCase(getSubredditPosts.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getSubredditPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.posts = action.payload;
        state.currentSubreddit = action.meta.arg;
      })
      .addCase(getSubredditPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.error = action.error.message;
      })
      
      // Comments
      .addCase(getPostComments.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getPostComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.currentPost = action.payload.post;
        state.comments = action.payload.comments;
      })
      .addCase(getPostComments.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.error = action.error.message;
      })
      
      // Subreddits
      .addCase(getPopularSubreddits.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getPopularSubreddits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.subreddits = action.payload;
      })
      .addCase(getPopularSubreddits.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.error = action.error.message;
      })
      
      // Search
      .addCase(searchRedditPosts.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(searchRedditPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.searchResults = action.payload;
      })
      .addCase(searchRedditPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.error = action.error.message;
      });
  }
});

export const { clearComments, setCurrentSubreddit } = redditSlice.actions;

export const selectPosts = (state) => state.reddit.posts;
export const selectComments = (state) => state.reddit.comments;
export const selectCurrentPost = (state) => state.reddit.currentPost;
export const selectSubreddits = (state) => state.reddit.subreddits;
export const selectSearchResults = (state) => state.reddit.searchResults;
export const selectIsLoading = (state) => state.reddit.isLoading;
export const selectHasError = (state) => state.reddit.hasError;
export const selectError = (state) => state.reddit.error;
export const selectCurrentSubreddit = (state) => state.reddit.currentSubreddit;

export default redditSlice.reducer;