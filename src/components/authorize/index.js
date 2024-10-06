import React, { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import Input from '../input';
import PropTypes from 'prop-types';
import './style.css';

function Authorize({ callbacks, error, t, login, password }) {
  const cn = bem('Authorize');

  return (
    <form className={cn()} onSubmit={callbacks.onSubmit}>
      <h2 className={cn('title')}>{t('login.title')}</h2>

      <div className={cn('input')}>
        <Input
          label={t('login')}
          type="login"
          name="login"
          value={login}
          onChange={callbacks.onChangeLogin}
        />
      </div>
      <div className={cn('input')}>
        <Input
          label={t('password.label')}
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

Authorize.propTypes = {
  login: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default memo(Authorize);
