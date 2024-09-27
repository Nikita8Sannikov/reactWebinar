import React, { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

const Navigation = ({ items = [] }) => {
  const cn = bem('nav');

  return (
    <ul className={cn()}>
      {items.map(item => (
        <li key={item.key} className={cn('item')}>
          <Link to={item.link}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
};

Navigation.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      link: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
};

export default memo(Navigation);
