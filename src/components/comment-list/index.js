import { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Comment from '../comment';
import CommentOptions from '../comment-options';
import CommentForm from '../comment-form';
import './style.css';

function CommentsList({ list = [], commentsCount, exists, onComment, onResponse }) {
  const cn = bem('CommentList');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyingToAuthor, setReplyingToAuthor] = useState('');

  const handleReplyClick = useCallback((commentId, authorName) => {
    setReplyingTo(commentId);
    setReplyingToAuthor(authorName);
  }, []);

  const handleReplySubmit = useCallback(
    (text, commentId) => {
      onResponse(text, commentId);
      setReplyingTo(null);
      setReplyingToAuthor('');
    },
    [onResponse],
  );

  const handleCancelReply = useCallback(() => {
    setReplyingTo(null);
    setReplyingToAuthor('');
  }, []);

  const renderReplyForm = commentId =>
    exists ? (
      <CommentForm
        title="Новый ответ"
        submit={text => handleReplySubmit(text, commentId)}
        placeholder={`Мой ответ для  ${replyingToAuthor}`}
        onCancel={handleCancelReply}
      />
    ) : (
      <CommentOptions exists={true} onCancel={handleCancelReply} />
    );

  const renderComments = useCallback(
    (comments, level = 0) =>
      comments.map(comment => (
        <div key={comment._id} style={{ marginLeft: level > 0 ? '30px' : '0' }}>
          <Comment
            comment={comment}
            /* {comment.children && comment.children.length > 0 && (
          <div>{renderComments(comment.children, level + 1)}</div>
        )} */
            onClick={() =>
              handleReplyClick(comment._id, comment.author?.profile?.name || t('commentList.name'))
            }
          />
          {replyingTo === comment._id && renderReplyForm(comment._id)}
          {comment.children &&
            comment.children.length > 0 &&
            renderComments(comment.children, level + 1)}
        </div>
      )),
    [handleReplyClick, replyingTo, renderReplyForm],
  );

  return (
    <div className={cn()}>
      <h3 className={cn('header')}>Комментарии ({commentsCount})</h3>
      {exists && renderComments(list)}
      {!exists && !replyingTo && <CommentOptions exists={exists} />}
      {exists && !replyingTo && (
        <CommentForm title="Новый комментарий" submit={onComment} placeholder="Текст " />
      )}
    </div>
  );
}

CommentsList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  commentsCount: PropTypes.number,
};

export default memo(CommentsList);
