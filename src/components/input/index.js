import { memo, useCallback, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import debounce from 'lodash.debounce';

import './style.css';

function Input(props) {
  // Внутренний стейт для быстрого отображения ввода
  const [value, setValue] = useState(props.value);

  const onChangeDebounce = useCallback(
    debounce(value => props.onChange(value, props.name), 600),
    [props.onChange, props.name],
  );

  // Обработчик изменений в поле
  const onChange = event => {
    const newValue = event.target.value;
    setValue(newValue);
    if (props.type !== 'login' && props.type !== 'password') {
      onChangeDebounce(newValue);
    } else {
      props.onChange(newValue, props.type);
    }
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(props.value), [props.value]);

  const cn = bem('Input');
  return (
    <div className={cn()}>
      {props.label && <label className={cn('label')}>{props.label}</label>}
      <input
        className={cn({ theme: props.theme })}
        value={value}
        type={props.type}
        placeholder={props.placeholder}
        onChange={onChange}
      />
    </div>
  );
}

Input.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.string,
};

Input.defaultProps = {
  onChange: () => {},
  type: 'text',
  theme: '',
};

export default memo(Input);
