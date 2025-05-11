import './Comments.css';
import { useSelector } from 'react-redux';
import { selectComments, selectCommentsLoading } from '../../store/commentsSlice';

const Comments = () => {
  const comments = useSelector(selectComments);
  const isLoading = useSelector(selectCommentsLoading);

  return (
    <div className="comments-container">
      {isLoading ? (
        <div className="loading-comments">Loading comments...</div>
      ) : (
        comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      )}
    </div>
  );
};

const CommentItem = ({ comment }) => {
  if (comment.body === '[deleted]' || comment.body === '[removed]' || comment.body === '[eliminado]') {
    return null;
  };

  return (
    <div className="comment">
      <p className="comment-author">u/{comment.author}</p>
      <p className="comment-body">{comment.body}</p>
      <p className="comment-meta">↑ {comment.ups} votes</p>
    </div>
  );
};

export default Comments;