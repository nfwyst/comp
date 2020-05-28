import React, { useContext, useCallback } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

export interface BaseMenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export type MenuItemProps = BaseMenuItemProps & React.LiHTMLAttributes<HTMLElement>

const MenuItem: React.FC<MenuItemProps> = props => {
  const { index, disabled, className, style, children, ...restProps } = props
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index
  })
  const handleClick = useCallback(() => {
    if (context.onSelect && !disabled && (typeof index === 'string')) context.onSelect(index)
  }, [index, context, disabled])
  return (
    <li className={classes} style={style} {...restProps} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.defaultProps = {
  disabled: false
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
