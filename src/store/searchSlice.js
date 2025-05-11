import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { searchPosts } from '../api/redditAPI';

export const searchRedditPosts = createAsyncThunk(
  'search/searchRedditPosts',
  async (query) => {
    return await searchPosts(query);
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    isLoading: false,
    hasError: false,
    error: null
  },
  reducers: {
    clearSearchResults(state) {
      state.results = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchRedditPosts.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(searchRedditPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload;
      })
      .addCase(searchRedditPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.error = action.error.message;
      });
  }
});

export const { clearSearchResults } = searchSlice.actions;
export const selectSearchResults = (state) => state.search.results;

export default searchSlice.reducer;