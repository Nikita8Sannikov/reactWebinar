import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props) {
  const handleAddToModal = () => {
    props.onAdd(props.item);
  };

  const handleDeleteFromModal = e => {
    e.stopPropagation();
    props.onDelete(props.item.code);
  };

  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">{props.item.price} ₽</div>
      {props.item.quantity && <div className="Item-quantity">{props.item.quantity} шт </div>}
      <div className="Item-actions">
        {!props.item.quantity ? (
          <button onClick={handleAddToModal}>Добавить</button>
        ) : (
          <button onClick={handleDeleteFromModal}>Удалить</button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  quantity: PropTypes.number,
};

export default React.memo(Item);
