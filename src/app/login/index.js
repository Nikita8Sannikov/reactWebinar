import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Header from '../../components/header';
import Authorize from '../../components/authorize';

function Login() {
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
    <PageLayout>
      <Header />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Authorize login={login} password={password} error={error} callbacks={callbacks} t={t} />
    </PageLayout>
  );
}

export default memo(Login);
