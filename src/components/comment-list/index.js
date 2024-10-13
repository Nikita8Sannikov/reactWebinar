import { memo, useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Comment from '../comment';
import CommentOptions from '../comment-options';
import CommentForm from '../comment-form';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function CommentsList({ list = [], commentsCount, exists, onComment, onResponse, currentUser }) {
  const cn = bem('CommentList');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyingToAuthor, setReplyingToAuthor] = useState('');
  const { t } = useTranslate();
  const replyRef = useRef(null);

  useEffect(() => {
    if (replyingTo && replyRef.current) {
      setTimeout(() => {
        replyRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [replyingTo]);

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

  const renderReplyForm = useCallback(
    commentId =>
      exists ? (
        <div ref={replyRef}>
          <CommentForm
            title={t('newResponse')}
            submit={text => handleReplySubmit(text, commentId)}
            onCancel={handleCancelReply}
          />
        </div>
      ) : (
        <div ref={replyRef}>
          <CommentOptions exists={true} onCancel={handleCancelReply} />
        </div>
      ),
    [handleCancelReply, handleReplySubmit, t, exists],
  );

  const renderComments = useCallback(
    (comments, level = 0) => {
      return comments
        .filter(comment => comment.parentId === null || comment.parentId === undefined) // Рендерим только корневые комментарии
        .map(comment => (
          <div key={comment._id} style={{ marginLeft: level > 0 && level < 12 ? '30px' : '0' }}>
            <Comment
              currentUser={currentUser}
              exists={exists}
              comment={comment}
              onClick={() =>
                handleReplyClick(
                  comment._id,
                  comment.author?.profile?.name || t('commentList.name'),
                )
              }
            />
            {comment.children &&
              comment.children.length > 0 &&
              renderComments(comment.children, level + 1)}
            {replyingTo === comment._id && renderReplyForm(comment._id)}
          </div>
        ));
    },
    [currentUser, exists, handleReplyClick, replyingTo, renderReplyForm, t],
  );

  return (
    <div className={cn()}>
      <h3 className={cn('header')}>
        {t('comment.title')} {exists ? `(${commentsCount})` : '(0)'}
      </h3>
      {renderComments(list)}
      {/* {!exists && <CommentOptions exists={exists} />} */}
      {exists && !replyingTo && (
        <CommentForm title={t('newСomment')} submit={onComment} placeholder={t('text')} />
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
  onComment: PropTypes.func.isRequired,
  onResponse: PropTypes.func.isRequired,
  exists: PropTypes.bool.isRequired,
  handleReplyClick: PropTypes.func,
  handleCancelReply: PropTypes.func,
  handleReplySubmit: PropTypes.func,
  renderReplyForm: PropTypes.func,
  renderComments: PropTypes.func,
  t: PropTypes.func,
};

export default memo(CommentsList);
