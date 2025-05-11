# Reddit Minimal

A lightweight Reddit client built with React and Redux, featuring real-time post browsing, comments, and search functionality. I made this to practice making a react-redux app

## Features

- 🏠 Browse popular subreddits
- 🔍 Search across all of Reddit
- 💬 View and toggle comments
- 🕒 Relative timestamps for posts
- 🎨 Clean, minimalist UI
- ⚡ Redux-powered state management

## Technologies Used

- React (Create React App)
- Redux Toolkit
- React Icons
- date-fns (for time formatting)
- Axios (for API calls)
- CSS Modules

## Take a look

You can see the app running at: (pending)

## Redux State Management

The app uses Redux Toolkit with these slices:

1. **Posts Slice**
   - Manages both subreddit posts and search results
   - Tracks current subreddit and search queries
   - Handles loading states for all post-related operations

2. **Comments Slice**
   - Manages comment threads
   - Toggles comment visibility
   - Handles comment loading states
   - Tracks current post being viewed

3. **Subreddits Slice**
   - Manages the list of popular subreddits
   - Tracks the currently selected subreddit
   - Handles loading states for subreddit list

## Future Improvements

1. Add user authentication
2. Implement voting functionality
3. Add infinite scrolling

## API Usage
This app uses Reddit's public API Base URL: https://www.reddit.com 
No authentication required for read operations.
Rate limited to ~60 requests per minute.