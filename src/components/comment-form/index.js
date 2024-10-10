import React, { useState, useCallback } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentForm({ title, submit, onCancel, placeholder }) {
  const cn = bem('CommentForm');
  const [text, setText] = useState('');

  const callbacks = {
    onChange: useCallback(e => {
      setText(e.target.value);
    }, []),
    onSubmit: useCallback(
      e => {
        if (text.trim()) {
          e.preventDefault();
          submit(text);
          setText('');
        }
      },
      [text],
    ),
  };

  return (
    <form onSubmit={callbacks.onSubmit}>
      <div className={cn()}>
        <div className={cn('title')}>{title}</div>

        <textarea
          className={cn('textarea')}
          value={text}
          onChange={callbacks.onChange}
          placeholder={placeholder}
        />

        <div className={cn('prop')}>
          <button className={cn('button')} onClick={callbacks.onSubmit}>
            Отправить
          </button>

          {onCancel && <button onClick={onCancel}>Отмена</button>}
        </div>
      </div>
    </form>
  );
}

export default CommentForm;
