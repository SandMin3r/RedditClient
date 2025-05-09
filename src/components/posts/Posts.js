import { FaArrowUp, FaArrowDown, FaCommentAlt } from "react-icons/fa";
import './Posts.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    getSubredditPosts, 
    selectPosts, 
    selectIsLoading, 
    selectHasError,
    getPostComments,
    clearComments
} from "../../store/redditSlice";
import Comments from "../comments/Comments";

export const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoading);
  const hasError = useSelector(selectHasError);

  useEffect(() => {
    dispatch(getSubredditPosts('AskReddit')); // Default subreddit
  }, [dispatch]);

  if (isLoading) return <div>Loading posts...</div>;
  if (hasError) return <div>Error loading posts</div>;

  return (
    <div className="posts-container">
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

const PostItem = ({ post }) => {
  const dispatch = useDispatch();
  const currentPost = useSelector(state => state.reddit.currentPost);
  const showComments = currentPost?.id === post.id;

  const toggleComments = () => {
    if (showComments) {
      dispatch(clearComments());
    } else {
      dispatch(getPostComments({ subreddit: post.subreddit, postId: post.id }));
    }
  };

  return (
    <div className="post">
      <form>
        <button>
          <FaArrowUp />
        </button>
        <p>{post.ups}</p>
        <button>
          <FaArrowDown />
        </button>
      </form>
      <div className="post-container">
        <h2>{post.title}</h2>
          {post.url && (post.url.endsWith('.jpg') || post.url.endsWith('.png')) && (
            <img src={post.url} alt="post content" className="post-image" />
          )}
        <div className="post-footer">
          <span>Posted by u/{post.author}</span>
            <button onClick={toggleComments}>
              <FaCommentAlt />
              <span>{post.num_comments}</span>
            </button>
        </div>
        {showComments && <Comments />}
      </div>
    </div>
  )
};