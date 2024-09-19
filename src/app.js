import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/Modal';
/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [busket, setBusket] = useState([]);

  const callbacks = {
    onModal: useCallback(() => {
      setIsModalOpen(true);
    }, []),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls title={'В корзине: '} busket={busket} onModal={callbacks.onModal} />
      <List busket={busket} setBusket={setBusket} list={list} />
      <Modal
        isVisible={isModalOpen}
        title="В корзине"
        content={busket}
        onClose={() => setIsModalOpen(false)}
        setBusket={setBusket}
        footerTitle="Итого "
      />
    </PageLayout>
  );
}

export default App;
