import React, { memo, useCallback, useEffect, useState } from 'react';
import Input from '../input';
import { cn as bem } from '@bem-react/classname';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function Authorize() {
  const cn = bem('Authorize');
  const { t } = useTranslate();
  const navigate = useNavigate();
  const store = useStore();
  const [data, setData] = useState({
    login: '',
    password: '',
  });
  const [error, setError] = useState('');

  const callbacks = {
    onChange: useCallback((value, name) => {
      setData(prev => ({ ...prev, [name]: value }));
    }, []),
    onSubmit: useCallback(
      async event => {
        event.preventDefault();
        try {
          console.log(data);
          await store.actions.user.signIn(data);
          navigate('/');
        } catch (e) {
          setError(e.message);
        }
      },
      [data],
    ),
  };
  useEffect(() => {
    console.log('Данные обновлены:', data);
  }, [data]);

  return (
    <form className={cn()} onSubmit={callbacks.onSubmit}>
      <h2 className={cn('title')}>{t('login.title')}</h2>

      <div className={cn('input')}>
        <Input type="login" name="login" value={data.login} onChange={callbacks.onChange} />
      </div>
      <div className={cn('input')}>
        <Input
          type="password"
          name="password"
          value={data.password}
          onChange={callbacks.onChange}
        />
      </div>
      {error && <p className={cn('error')}>{error}</p>}

      <button className={cn('button')} type="submit">
        {t('login.button')}
      </button>
    </form>
  );
}

export default memo(Authorize);
