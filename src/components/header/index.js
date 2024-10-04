import { memo, useEffect, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function Header() {
  const cn = bem('Header');
  const [username, setUsername] = useState('');
  const { t } = useTranslate();
  const isAuthenticated = !!localStorage.getItem('authToken');

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const response = await fetch('/api/v1/users/self?fields=*', {
          headers: { 'X-Token': token },
        });
        const data = await response.json();
        if (data.result && data.result.profile) {
          setUsername(data.result.profile.name);
        }
      } catch (error) {
        console.error('Ошибка при получении профиля:', error);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: { 'X-Token': token },
    });
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    window.location.reload();
  };

  return (
    <div className={cn()}>
      {isAuthenticated ? (
        <div>
          <Link to="/profile" className={cn('username')}>
            {username}
          </Link>
          <button onClick={handleLogout}>{t('logout.button')}</button>
        </div>
      ) : (
        <Link to="/login" className={cn('button')}>
          {t('login.label')}
        </Link>
      )}
    </div>
  );
}

export default memo(Header);
