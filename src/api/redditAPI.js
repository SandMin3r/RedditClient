import axios from 'axios';

const BASE_URL = 'https://www.reddit.com';

export const fetchSubredditPosts = async (subreddit) => {
  try {
    const response = await axios.get(`${BASE_URL}/r/${subreddit}.json`);
    return response.data.data.children.map(post => post.data);
  } catch (error) {
    console.error('Error fetching subreddit posts:', error);
    throw error;
  }
};

export const fetchPostComments = async (subreddit, postId) => {
  try {
    const response = await axios.get(`${BASE_URL}/r/${subreddit}/comments/${postId}.json`);
    // The response contains two items: post details and comments
    return {
      post: response.data[0].data.children[0].data,
      comments: response.data[1].data.children.map(comment => comment.data)
    };
  } catch (error) {
    console.error('Error fetching post comments:', error);
    throw error;
  }
};

export const fetchPopularSubreddits = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/subreddits/popular.json`);
    return response.data.data.children.map(sub => sub.data);
  } catch (error) {
    console.error('Error fetching popular subreddits:', error);
    throw error;
  }
};

export const searchPosts = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search.json?q=${query}`);
    console.log(response.data.data.children.map(post => post.data));
    return response.data.data.children.map(post => post.data);
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error;
  }
};