import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import Navigation from '../../components/navigation';
import SubHeader from '../../components/sub-header';

function Main() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.setParams({ page: 1 });
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));
  const navigation = {
    main: [{ key: 1, title: 'Главная', link: '/' }],
  };
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onPaginate: useCallback(page => store.actions.catalog.setParams({ page }), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} link={`/products/${item._id}`} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <SubHeader>
        <Navigation items={navigation.main} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </SubHeader>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        totalCount={select.count}
        currentPage={select.page}
        limit={select.limit}
        onPageChange={callbacks.onPaginate}
      />
    </PageLayout>
  );
}

export default memo(Main);
