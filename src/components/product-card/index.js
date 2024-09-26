import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';

function ProductCard({ product = {}, onAdd = () => {} }) {
  const cn = bem('ProductCard');

  return (
    <div className={cn()}>
      <div className={cn('description')}> {product.description}</div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Страна производитель: </div>
        <div className={cn('value')}>
          {product.madeIn?.title} ({product.madeIn?.code})
        </div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Категория: </div>
        <div className={cn('value')}>{product.category?.title}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Год выпуска: </div>
        <div className={cn('value')}>{product.edition}</div>
      </div>
      <div className={cn('prop', { size: 'big' })}>
        <div className={cn('label')}>Цена: </div>
        <div className={cn('value')}>{numberFormat(product.price)} ₽</div>
      </div>
      <button
        onClick={() => {
          onAdd(product._id);
        }}
      >
        Добавить
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onAdd: PropTypes.func,
};

export default memo(ProductCard);
