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
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const callbacks = {
    onChangeLogin: useCallback(value => setLogin(value), []),
    onChangePassword: useCallback(value => setPassword(value), []),
    onSubmit: useCallback(
      async event => {
        event.preventDefault();
        try {
          await store.actions.user.signIn(login, password);
          navigate('/');
        } catch (e) {
          setError(e.message);
        }
      },
      [login, password],
    ),
  };

  return (
    <form className={cn()} onSubmit={callbacks.onSubmit}>
      <h2 className={cn('title')}>{t('login.title')}</h2>

      <div className={cn('input')}>
        <Input type="login" name="login" value={login} onChange={callbacks.onChangeLogin} />
      </div>
      <div className={cn('input')}>
        <Input
          type="password"
          name="password"
          value={password}
          onChange={callbacks.onChangePassword}
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
