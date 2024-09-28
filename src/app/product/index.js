import { memo, useCallback, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card';
import Navigation from '../../components/navigation';
import SubHeader from '../../components/sub-header';

function Product() {
  const store = useStore();
  const params = useParams();

  useEffect(() => {
    store.actions.product.load(params.id);
  }, [params.id]);
  const navigation = {
    main: [{ key: 1, title: 'Главная', link: '/' }],
  };
  const select = useSelector(state => ({
    product: state.product.data,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout>
      <Head title={select.product.title} />
      <SubHeader>
        <Navigation items={navigation.main} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </SubHeader>
      {/* <Navigation items={navigation.main} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} /> */}
      <ProductCard product={select.product} onAdd={callbacks.addToBasket} />
    </PageLayout>
  );
}

export default memo(Product);
