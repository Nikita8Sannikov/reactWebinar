import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Item from '../item/';

const Modal = ({ isVisible = false, title, onClose, content, setBusket, footerTitle }) => {
  return !isVisible ? null : (
    <div className="modal fade">
      <div className="modal-dialog">
        <div className="modal-header">
          <h1 className="modal-title">{title}</h1>
          <button onClick={onClose}> Закрыть</button>
        </div>
        <div className="modal-body">
          <div className="modal-content">
            {content.map(item => (
              <div key={item.code} className="List-item">
                <Item item={item} setBusket={setBusket}></Item>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <div className="modal-footer--title">{footerTitle}</div>
          {content.map(item => item.price * item.quantity).reduce((acc, cur) => acc + cur, 0)} ₽
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isVisible: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  setBusket: PropTypes.func.isRequired,
  footerTitle: PropTypes.string,
};

export default React.memo(Modal);
