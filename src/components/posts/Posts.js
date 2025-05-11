import { FaArrowUp, FaArrowDown, FaCommentAlt } from "react-icons/fa";
import { formatDistanceToNow } from 'date-fns';
import './Posts.css';
import numeral from "numeral";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Comments from "../comments/Comments";
import { getPostComments, clearComments } from "../../store/commentsSlice";
import { selectAllPosts, selectPostsLoading, selectPostsError, getSubredditPosts } from "../../store/postsSlice";


export const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
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

  const renderMedia = () => {
    try {
      // 1. Image posts
      if (post.post_hint === 'image' || (post.url?.match(/\.(jpg|png|gif)$/i))) {
        return <img src={post.url} alt="post content" className="post-image" />;
      };

      // 2. Video posts (Reddit hosted)
      if (post.is_video && post.media?.reddit_video?.fallback_url) {
        return (
          <video controls className="post-video">
            <source src={post.media.reddit_video.fallback_url} type="video/mp4" />
              Your browser doesn't support HTML5 video.
          </video>
        );
      };

      // 3. Gallery posts (with safe access)
      if (post.is_gallery && post.gallery_data?.items && post.media_metadata) {
        return (
          <div className="post-gallery">
            {post.gallery_data.items.map(item => {
              const media = post.media_metadata[item.media_id];
              const source = media?.s?.u || media?.p?.find(p => p.x === media.s.x)?.u;
              return source ? (
                <img 
                  key={item.id}
                  src={source.replace(/&amp;/g, '&')} 
                  alt={`Gallery item ${item.id}`}
                />
              ) : null;
            })}
          </div>
        );
      };

      // 4. External video embeds
      if (post.post_hint === 'rich:video' && post.url) {
        if (post.url.includes('youtube.com') || post.url.includes('youtu.be')) {
          return (
            <div className="embed-container">
              <iframe 
                src={`https://www.youtube.com/embed/${getYouTubeId(post.url)}`}
                title="YouTube video"
                allowFullScreen
              />
            </div>
          );
        }
            // Add other embed types here (Twitter, Vimeo, etc.)
      };

        // 5. Text posts
      if (post.selftext) {
        return <div className="post-text">{post.selftext}</div>;
      }

      // 6. fallback
      return

    } catch (error) {
        console.error('Error rendering media:', error);
        return (
          <div className="post-error">
            Could not display this content. 
            <a href={`https://reddit.com${post.permalink}`} target="_blank" rel="noreferrer">View on Reddit</a>
          </div>
        );
    }
  };

  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const toggleComments = () => {
    if (showComments) {
      dispatch(clearComments());
    } else {
      dispatch(getPostComments({ subreddit: post.subreddit, postId: post.id }));
    }
  };

  const handleVote = (e, direction) => {
    e.preventDefault();
    console.log(direction); // Vote functionality is out of scope for now
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
        {renderMedia()}
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