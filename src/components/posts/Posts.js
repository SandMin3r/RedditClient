import { FaArrowUp, FaArrowDown, FaCommentAlt } from "react-icons/fa";
import { formatDistanceToNow } from 'date-fns';
import './Posts.css';
import numeral from "numeral";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Comments from "../comments/Comments";
import { getSubredditPosts, selectPosts, selectPostsLoading, selectPostsError } from "../../store/postsSlice";
import { getPostComments, clearComments } from "../../store/commentsSlice";

export const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectPostsLoading);
  const hasError = useSelector(selectPostsError);

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
  const currentPost = useSelector(state => state.comments.currentPost);
  const showComments = currentPost?.id === post.id;

  const toggleComments = () => {
    if (showComments) {
      dispatch(clearComments());
    } else {
      dispatch(getPostComments({ subreddit: post.subreddit, postId: post.id }));
    }
  };

  const handleVote = (e, direction) => {
    e.preventDefault();
    console.log(direction); // Vote functionality is out of scope
  }

  const postTime = formatDistanceToNow(
        new Date(post.created_utc * 1000), // Convert to milliseconds
        { addSuffix: true } // Adds "ago" to the end
  );

  return (
    <div className="post">
      <div className="vote-container">
        <button onClick={(e) => handleVote(e, 'up')}>
          <FaArrowUp />
        </button>
        <p>{numeral(post.ups).format('0.[0]a')}</p>
        <button onClick={(e) => handleVote(e, 'down')}>
          <FaArrowDown />
        </button>
      </div>
      <div className="post-container">
        <h2>{post.title}</h2>
          {post.url && (post.url.endsWith('.jpg') || post.url.endsWith('.png')) && (
            <img src={post.url} alt="post content" className="post-image" />
          )}
        <div className="post-footer">
          <span>u/{post.author}</span>
          <span>{postTime}</span>
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