import { memo, useEffect, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import './style.css';
import useSession from '../../hooks/use-session';

function Header() {
  const cn = bem('Header');
  const [username, setUsername] = useState('');
  const { restoreSession } = useSession();
  const { t } = useTranslate();
  const isAuthenticated = !!localStorage.getItem('authToken');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isAuthenticated) {
        const profile = await restoreSession();
        if (profile) {
          setUsername(profile.name);
        }
      }
    };

    fetchUserProfile();
  }, [isAuthenticated, restoreSession]);

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
