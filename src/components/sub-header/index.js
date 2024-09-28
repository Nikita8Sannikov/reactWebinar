import React, { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

const SubHeader = ({ children = React.ReactNode }) => {
  const cn = bem('SubHeader');
  return (
    <div className={cn('')}>
      {React.Children.map(children, child => (
        <div key={child.key}>{child}</div>
      ))}
    </div>
  );
};

SubHeader.propTypes = {
  children: PropTypes.node,
};
export default memo(SubHeader);
