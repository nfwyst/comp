import '../src/styles/index.scss'
import React from 'react'
import { addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const styles: React.CSSProperties = {
  textAlign: 'left',
  padding: 15
}

const CenterDecorator = (storyFn: any) => {
  return <div style={styles}>{storyFn()}</div>
}

addDecorator(CenterDecorator)
addDecorator(withInfo)
addParameters({
  info: {
    inline: true,
    header: false
  }
})
