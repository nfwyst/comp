import React, { FC, useState, useRef, useEffect, useCallback } from 'react'
import TreeNode from './treeNode'

export interface TreeData {
  name: string;
  key: string;
  type: string;
  collapsed: boolean;
  children?: TreeData[];
  parent?: TreeData;
  checked?: boolean;
}

export interface TreeProps {
  data: TreeData;
}

export interface IKeyNodeMap {
  [key: string]: TreeData;
}

export const Tree: FC<TreeProps> = props => {
  const { data } = props
  const [treeData, setTreeData] = useState(data)
  const keyNodeMap = useRef<IKeyNodeMap>({})

  const buildKeyMap = useCallback((data: TreeData, parent?: TreeData) => {
    keyNodeMap.current[data.key] = data
    if (parent) data.parent = parent
    if (data.children && data.children.length) {
      data.children.forEach(item => {
        buildKeyMap(item, data)
      })
    }
  }, [])
  useEffect(() => {
    buildKeyMap(treeData)
  }, [buildKeyMap, treeData])

  const handleCollapse = useCallback((key: string) => {
    let data = keyNodeMap.current[key]
    if (data) {
      data.collapsed = !data.collapsed
      data.children = data.children || []
      setTreeData({ ...treeData })
    }
  }, [treeData])

  const checkChildren = useCallback((children: TreeData[], checked: boolean) => {
    children.forEach(item => {
      item.checked = checked
      if (item.children) checkChildren(item.children, checked)
    })
  }, [])

  const checkParent = useCallback((parent: TreeData | undefined) => {
    while (parent) {
      parent.checked = parent.children?.every(item => item.checked)
      parent = parent.parent
    }
  }, [])

  const uncheckParent = useCallback((parent: TreeData | undefined) => {
    while (parent) {
      parent.checked = false
      parent = parent.parent
    }
  }, [])

  const onCheck = useCallback((key: string) => {
    let data = keyNodeMap.current[key]
    if (data) {
      data.checked = !data.checked
      if (data.checked) {
        checkChildren(data.children || [], true)
        checkParent(data.parent)
      } else {
        checkChildren(data.children || [], false)
        uncheckParent(data.parent)
      }
      setTreeData({ ...treeData })
    }
  }, [checkChildren, checkParent, treeData, uncheckParent])

  return (
    <div className="tree">
      <div className="tree-node">
        <TreeNode onCheck={onCheck} data={treeData} onCollapse={handleCollapse} />
      </div>
    </div>
  )
}
