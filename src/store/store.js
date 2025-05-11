import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import commentsReducer from './commentsSlice';
import subredditsReducer from './subredditsSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    subreddits: subredditsReducer,
    search: searchReducer
  }
});