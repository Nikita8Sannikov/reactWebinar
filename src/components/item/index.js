import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props) {
  const callbacks = {
    onAdd: useCallback(() => {
      const existingItem = props.busket.find(busketItem => busketItem.code === props.item.code);
      if (existingItem) {
        props.setBusket(
          props.busket.map(busketItem =>
            busketItem.code === props.item.code
              ? { ...busketItem, quantity: busketItem.quantity + 1 }
              : busketItem,
          ),
        );
      } else {
        props.setBusket([...props.busket, { ...props.item, quantity: 1 }]);
      }
    }, [props.busket]),

    onDelete: useCallback(() => {
      props.setBusket(prevBusket => {
        return prevBusket.filter(item => item.code !== props.item.code);
      });
    }, [props.item.code, props.setBusket]),
  };

  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">{props.item.price} ₽</div>
      {props.item.quantity && <div className="Item-quantity">{props.item.quantity} шт </div>}
      <div className="Item-actions">
        {!props.item.quantity ? (
          <button onClick={callbacks.onAdd}>Добавить</button>
        ) : (
          <button onClick={callbacks.onDelete}>Удалить</button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
  }).isRequired,
  quantity: PropTypes.number,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
};

export default React.memo(Item);
