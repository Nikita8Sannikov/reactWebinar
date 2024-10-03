import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Header from '../../components/header';
import Authorize from '../../components/authorize';

function Login() {
  const { t } = useTranslate();

  return (
    <PageLayout>
      <Header />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Authorize />
    </PageLayout>
  );
}

export default memo(Login);
