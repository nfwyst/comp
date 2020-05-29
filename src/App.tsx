import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu';
import Icon from './components/Icon/icon';
import Input from './components/Input/input';
library.add(fas)
const { Item: MenuItem, SubMenu } = Menu;

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon="coffee" theme="primary" size="10x" />
        <Menu mode="vertical">
          <MenuItem>
            this is one
          </MenuItem>
          <MenuItem disabled>
            this is two
          </MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
            <MenuItem>dropdown 3</MenuItem>
          </SubMenu>
          <MenuItem>
            this is three
          </MenuItem>
        </Menu>
        <Button type={ButtonType.Primary} size={ButtonSize.Large}>hello</Button>
        <Button type={ButtonType.Link} target="_blank" href="http://wwww.baidu.com">hello baidu</Button>
        <Button onClick={e => { alert(e.clientX) }} type={ButtonType.Danger}>hello baidu</Button>
        <Button disabled>this is disabled</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Input icon="coffee" />
      </header>
    </div>
  );
}

export default App;
