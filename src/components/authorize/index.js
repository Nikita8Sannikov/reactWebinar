import React, { memo, useCallback, useState } from 'react';
import Input from '../input';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function Authorize() {
  const cn = bem('Authorize');
  const { t } = useTranslate();

  const [data, setData] = useState({
    login: '',
    password: '',
  });

  const callbacks = {
    onChange: useCallback((value, name) => {
      setData(prev => ({ ...prev, [name]: value }));
    }, []),
    onSubmit: useCallback(
      event => {
        event.preventDefault();
      },
      [data],
    ),
  };

  return (
    <form className={cn()} onSubmit={callbacks.onSubmit}>
      <h2 className={cn('title')}>{t('title')}</h2>

      <div className={cn('input')}>
        <Input
          type="login"
          name="login"
          value={data.login}
          onChange={callbacks.onChange}
          placeholder="Введите login"
        />
      </div>
      <div className={cn('input')}>
        <Input
          type="password"
          name="password"
          value={data.password}
          onChange={callbacks.onChange}
          placeholder="Введите ваш password"
        />
      </div>

      <button className={cn('button')} type="submit">
        {t('signIn')}
      </button>
    </form>
  );
}

export default memo(Authorize);
