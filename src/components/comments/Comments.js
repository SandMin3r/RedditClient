import { useSelector } from 'react-redux';
import './Comments.css';
// Update selector imports
import { selectComments, selectCommentsLoading } from '../../store/commentsSlice';

const Comments = () => {
  const comments = useSelector(selectComments);
  const isLoading = useSelector(selectCommentsLoading);

  if (isLoading) return <div>Loading comments...</div>;

  return (
    <div className="comments-container">
      <div className="comments-list">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

const CommentItem = ({ comment }) => {
  if (comment.body === '[deleted]' || comment.body === '[removed]') {
    return null;
  }

  return (
    <div className="comment">
      <p className="comment-author">u/{comment.author}</p>
      <p className="comment-body">{comment.body}</p>
      <p className="comment-meta">↑ {comment.ups} votes</p>
    </div>
  );
};

export default Comments;