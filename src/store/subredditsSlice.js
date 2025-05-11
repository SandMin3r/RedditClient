import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPopularSubreddits } from '../api/redditAPI';

export const getPopularSubreddits = createAsyncThunk(
  'subreddits/getPopularSubreddits',
  async () => {
    return await fetchPopularSubreddits();
  }
);

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState: {
    subreddits: [],
    currentSubreddit: 'AskReddit',
    isLoading: false,
    hasError: false,
    error: null
  },
  reducers: {
    setCurrentSubreddit(state, action) {
      state.currentSubreddit = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPopularSubreddits.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getPopularSubreddits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subreddits = action.payload;
      })
      .addCase(getPopularSubreddits.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.error = action.error.message;
      });
  }
});

export const { setCurrentSubreddit } = subredditsSlice.actions;
export const selectSubreddits = (state) => state.subreddits.subreddits;
export const selectCurrentSubreddit = (state) => state.subreddits.currentSubreddit;

export default subredditsSlice.reducer;