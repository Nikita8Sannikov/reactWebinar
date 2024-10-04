import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import useStore from '../hooks/use-store';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import User from './user';
/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);
  const store = useStore();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        await store.actions.user.loadProfile();
      }
    };
    fetchProfile();
  }, [store.actions.user]);
  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/profile'} element={<User />} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
