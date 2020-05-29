import React, {
  ReactNode, FC, InputHTMLAttributes, ChangeEvent, KeyboardEvent, useCallback
} from 'react';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon/icon'

export type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size' | 'onChange' | 'onKeyUp'> {
  // 是否禁用
  disabled?: boolean;
  // 输入框大小
  size?: InputSize;
  // 输入框前缀
  prepend?: 'string' | ReactNode;
  // 输入框后缀
  append?: 'string' | ReactNode;
  // css 类
  className?: 'string';
  // 添加图标, 悬浮在 input 组件右侧
  icon?: IconProp;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = props => {
  const {
    disabled, size, prepend, append,
    style, type, className, icon, ...restProps
  } = props
  const classes = classNames('input-container', className, {
    'input-disabled': disabled,
    [`input-${size}`]: size,
    'input-group-append': append
  })

  const fixControlledValue = useCallback((value: any) => {
    if (value == null) return ''
    return value
  }, [])
  if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }

  return (
    <div className={classes} style={style}>
      {prepend && <div className="input-prepend">{prepend}</div>}
      {icon && !append && <div className="input-icon"><Icon icon={icon} /></div>}
      <input type={type} disabled={disabled} {...restProps} />
      {append && <div className="input-append">{append}</div>}
    </div>
  )
}

Input.defaultProps = {
  type: 'text'
}

export default Input
