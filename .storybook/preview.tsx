import '../src/styles/index.scss'
import React from 'react'
import { addDecorator } from '@storybook/react'

const styles: React.CSSProperties = {
  textAlign: 'left',
  padding: 15
}

const CenterDecorator = (storyFn: any) => {
  return <div style={styles}>{storyFn()}</div>
}

addDecorator(CenterDecorator)
