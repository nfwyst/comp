import React from 'react';
import { storiesOf } from '@storybook/react';
import Upload from '../components/Upload/upload';
import { UploadFileStatusProps } from '../components/Upload/upload';
import Icon from '../components/Icon/icon';

const defaultFileList: UploadFileStatusProps[] = [
  { id: '1', size: 1, name: 'hello.md', status: 'uploading', percent: 20 },
  { id: '2', size: 2, name: 'hah.md', status: 'done', percent: 100 },
  { id: '3', size: 3, name: 'world.md', status: 'error', percent: 0 }
]

storiesOf('Upload', module)
  .add('默认 Upload', () => (
    <Upload
      action="https://jsonplaceholder.typicode.com/posts/"
      onChange={(file) => console.log('onchange ', file)}
      onRemove={(file) => console.log('onremove', file)}
      name="file"
      drag
    >
      <Icon icon="upload" size="5x" theme="secondary" />
      <br />
      <p>拖拽文件上传</p>
    </Upload>
  ))
