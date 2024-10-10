import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

function CommentOptions({ exists, onCancel }) {
  const cn = bem('CommentOptions');
  const location = useLocation();

  return (
    <div className={cn()}>
      <Link className={cn('link')} to="/login" state={{ back: location.pathname }}>
        Войдите
      </Link>
      <div>
        , чтобы иметь возможность комментировать
        {exists ? 'ответить' : 'комментировать'}
      </div>
      {exists && (
        <button className={cn('cancel')} onClick={onCancel}>
          Отмена
        </button>
      )}
    </div>
  );
}

CommentOptions.propTypes = {
  exists: propTypes.bool,
  onCancel: propTypes.func,
};

export default CommentOptions;
