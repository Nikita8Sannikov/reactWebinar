import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import { formatDate } from '../../utils/formate-date';
import './style.css';
function Comment({ comment, onClick }) {
  const { author, text, dateCreate, isDeleted } = comment;

  const cn = bem('Comment');

  return (
    <div className={cn()}>
      <div className={cn('user-date')}>
        <div className={cn('user')}>{author.profile.name}</div>
        <div className={cn('date')}>{formatDate(dateCreate)}</div>
      </div>
      <p className={cn('text')}>{isDeleted ? 'No content' : text}</p>
      <button className={cn('answer-btn')} onClick={onClick}>
        Ответить
      </button>
    </div>
  );
}

export default memo(Comment);
