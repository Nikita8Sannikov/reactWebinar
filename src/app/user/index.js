import { memo, useEffect } from 'react';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Header from '../../components/header';
import UserCard from '../../components/user-card';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function User() {
  const { t } = useTranslate();
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const select = useSelector(state => ({
    data: {
      name: state.user.name || '',
      email: state.user.email || '',
      phone: state.user.phone || '',
    },
    waiting: state.user.waiting,
  }));

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <PageLayout>
      <Header />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <UserCard data={select.data} title={t('profile.title')} t={t} />
    </PageLayout>
  );
}

export default memo(User);
