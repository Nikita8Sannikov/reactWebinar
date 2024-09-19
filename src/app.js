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
  const busket = store.getState().busket;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const callbacks = {
    onModal: useCallback(() => {
      setIsModalOpen(true);
    }, []),
    onAdd: useCallback(
      item => {
        store.AddItemToModal(item);
      },
      [store],
    ),
    onDelete: useCallback(
      code => {
        store.DeleteItemFromModal(code);
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls title={'В корзине: '} busket={busket} onModal={callbacks.onModal} />
      <List list={list} onAdd={callbacks.onAdd} />
      <Modal
        isVisible={isModalOpen}
        title="В корзине"
        content={busket}
        onClose={() => setIsModalOpen(false)}
        onDelete={callbacks.onDelete}
        footerTitle="Итого "
      />
    </PageLayout>
  );
}

export default App;
