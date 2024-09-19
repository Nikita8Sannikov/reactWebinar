import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Controls({ title, busket = [], onModal = () => {} }) {
  const totalItems = busket.map(item => item.quantity).reduce((acc, cur) => acc + cur, 0);
  const totalPrice = busket
    .map(item => item.price * item.quantity)
    .reduce((acc, cur) => acc + cur, 0);
  return (
    <div className="Controls">
      <div className="control-title">
        {title}
        <span>
          {busket.length === 0
            ? 'пусто'
            : `${totalItems}
          ${plural(totalItems, {
            one: 'товар',
            few: 'товара',
            many: 'товаров',
          })}
          / ${totalPrice} ₽`}
        </span>
      </div>

      <button onClick={() => onModal()}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onModal: PropTypes.func,
};

export default React.memo(Controls);
