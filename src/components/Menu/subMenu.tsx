import React, {
  useContext, FunctionComponentElement, useState, useCallback, useRef
} from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';
import { CSSTransition } from 'react-transition-group';
import Icon from '../Icon/icon';

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
  disabled?: boolean;
  open?: boolean;
}

const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  children,
  className,
  open: isOpen
}) => {
  const [open, setOpen] = useState(isOpen)
  const context = useContext(MenuContext)
  const handleMouseRef = useRef(null) as any
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index.startsWith(`${index}-`),
    'menu-open': open,
  })
  const renderChildren = () => {
    return React.Children.map(children, (child, id) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${id}`
        })
      } else {
        console.error('SubMenu 下面只能使用 MenuItem 作为子组件')
      }
    })
  }
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!open)
  }
  const handleMouse = useCallback((e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(handleMouseRef.current)
    e.preventDefault()
    handleMouseRef.current = setTimeout(() => {
      setOpen(toggle)
    }, 300)
  }, [setOpen, handleMouseRef])
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick,
  } : {}
  const hoverEvents = context.mode === 'horizontal' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
  } : {}
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon={open ? "angle-up" : "angle-down"} className="arrow-icon" />
      </div>
      <CSSTransition
        in={open}
        timeout={300}
        classNames="zoom-in-top"
        appear
        unmountOnExit
      >
        <ul className="submenu">
          {renderChildren()}
        </ul>
      </CSSTransition>
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

SubMenu.defaultProps = {
  open: false
}

export default SubMenu
