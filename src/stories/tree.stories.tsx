import React from 'react';
import { storiesOf } from '@storybook/react';
import { Tree, TreeData } from '../components/Tree/tree';

const data: TreeData = {
  name: '父亲',
  key: '1',
  type: 'folder',
  collapsed: true,
  children: [{
    name: '儿子',
    key: '1-1',
    type: 'folder',
    collapsed: true,
    children: [{
      name: '重孙',
      key: '1-1-1',
      type: 'folder',
      collapsed: false
    }]
  }, {
    name: '儿子1',
    key: '1-2',
    type: 'folder',
    collapsed: true
  }]
}

storiesOf('Tree', module)
  .add('基础树形结构', () => (
    <Tree data={data} onChecked={k => console.log(k)} />
  ))
