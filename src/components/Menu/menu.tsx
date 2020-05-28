import React, { createContext, useState, useCallback } from 'react';
import classNames from 'classnames';
import MenuItem, { MenuItemProps } from './menuItem';
import SubMenu from './subMenu';
import { SubMenuProps } from './subMenu';

type MenuMode = 'horizontal' | 'vertical'
export interface BaseMenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: (selectedIndex: string) => void;
  children?: React.ReactNode;
}
export interface IMenuContext {
  index: string;
  onSelect?: (selectedIndex: string) => void;
  mode?: MenuMode;
}
export const MenuContext = createContext<IMenuContext>({ index: '0' })
export type MenuProps = BaseMenuProps & React.MenuHTMLAttributes<HTMLElement> & React.LiHTMLAttributes<HTMLElement>

interface MenuType extends React.FC<MenuProps> {
  Item: React.FC<MenuItemProps>,
  SubMenu: React.FC<SubMenuProps>
}

const Menu: MenuType = props => {
  const { className, mode, style, children, defaultIndex, onSelect, ...restProps } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })
  const handleClick = useCallback((index: string) => {
    setActive(index)
    onSelect && onSelect(index)
  }, [onSelect])
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode
  }
  const renderChildren = useCallback(() => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { index: `${index}` })
      } else {
        console.error('Menu 下面只能使用 MenuItem 或 SubMenu 作为子组件')
      }
    })
  }, [children])
  return (
    <ul className={classes} style={style} {...restProps} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal'
}

Menu.Item = MenuItem
Menu.SubMenu = SubMenu

export default Menu
