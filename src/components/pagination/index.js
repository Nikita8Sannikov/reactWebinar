import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({
  currentPage = 1,
  limit = 10,
  totalCount = 1000,
  sidenumber = 1,
  onPageChange = () => {},
}) {
  const cn = bem('Pagination');

  const length = Math.ceil(totalCount / Math.max(limit, 1));

  let left = Math.max(currentPage - sidenumber, 1);
  let right = Math.min(left + sidenumber * 2, length);

  left = Math.max(right - sidenumber * 2, 1);

  let items = [];
  if (left > 1) items.push(1);
  if (left > 2) items.push(null);
  for (let page = left; page <= right; page++) items.push(page);
  if (right < length - 1) items.push(null);
  if (right < length) items.push(length);

  return (
    <div className={cn()}>
      <ul className={cn('wrapper')}>
        {items.map((num, index) => (
          <li
            key={index}
            className={cn('item', { active: num === currentPage, split: !num })}
            onClick={() => onPageChange(num)}
          >
            {num || '...'}
          </li>
        ))}
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  limit: PropTypes.number,
  totalCount: PropTypes.number,
  sidenumber: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default memo(Pagination);
