import React from 'react';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import Menu, { MenuProps } from '../components/Menu/menu'
import SubMenu from '../components/Menu/subMenu';

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}

const testVerProps: MenuProps = {
  defaultValue: '0',
  mode: 'vertical'
}

const genMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <Menu.Item>
        active
      </Menu.Item>
      <Menu.Item disabled>
        disabled
      </Menu.Item>
      <Menu.Item>
        others
      </Menu.Item>
      <SubMenu title="下拉菜单">
        <Menu.Item>
          hello sub menu
        </Menu.Item>
      </SubMenu>
    </Menu>
  )
}

const createStyleFile = (): HTMLStyleElement => {
  const cssFile: string = `
    .menu .submenu  {
      dispaly: none;
    }
    .menu-open .submenu {
      dispaly: none;
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('测试菜单', () => {
  beforeEach(() => {
    wrapper = render(genMenu(testProps))
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('默认 props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test')
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('点击激活', () => {
    const three = wrapper.getByText('others')
    fireEvent.click(three)
    expect(three).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })
  it('纵向模式', () => {
    cleanup()
    const wrapper = render(genMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
  it('应该显示子菜单', () => {
    expect(wrapper.queryByText('hello sub menu')?.parentElement).toBeVisible()
    const dropdownElement = wrapper.getByText('下拉菜单')
    fireEvent.mouseEnter(dropdownElement)
    expect(wrapper.queryByText('hello sub menu')?.parentElement).toBeVisible()
  })
})
