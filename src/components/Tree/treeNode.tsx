import React, { FC } from 'react'
import { TreeData } from './tree';
import Icon from '../Icon/icon';

export interface TreeNodeProps {
  data: TreeData;
  onCollapse: (key: string) => void;
  onCheck: (key: string) => void;
}

export const TreeNode: FC<TreeNodeProps> = props => {
  const {
    data: { children, name, key, collapsed, checked },
    onCollapse,
    onCheck,
  } = props
  let caret = null;
  let icon = null;
  if (children && children.length) {
    caret = (
      <Icon onClick={() => onCollapse(key)} icon={collapsed ? 'caret-down' : "caret-right"} />
    )
    icon = collapsed ? <Icon icon="folder-open" /> : <Icon icon="folder" />
  } else {
    caret = null
    icon = (
      <Icon icon="file" />
    )
  }
  return (
    <div className="tree-node">
      <div className="inner">
        {caret}
        <span className="content">
          {icon}
          <input type="checkbox" checked={!!checked} onChange={() => onCheck(key)} />
          {name}
        </span>
      </div>
      {
        children && children.length && collapsed && (
          <div className="children">
            {
              children.map((item: TreeData) => {
                return (
                  <TreeNode onCheck={onCheck} data={item} key={item.key} onCollapse={onCollapse} />
                )
              })
            }
          </div>
        )
      }
    </div>
  )
}

export default TreeNode
