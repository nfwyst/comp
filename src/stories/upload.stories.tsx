import React from 'react';
import { storiesOf } from '@storybook/react';
import Upload from '../components/Upload/upload';
import { action } from '@storybook/addon-actions';
import { UploadFileStatusProps } from '../components/Upload/upload';

const defaultFileList: UploadFileStatusProps[] = [
  { id: '1', size: 1, name: 'hello.md', status: 'uploading', percent: 20 },
  { id: '2', size: 2, name: 'hah.md', status: 'done', percent: 100 },
  { id: '3', size: 3, name: 'world.md', status: 'error', percent: 0 }
]

storiesOf('Upload', module)
  .add('默认 Upload', () => (
    <Upload
      action="https://jsonplaceholder.typicode.com/posts/"
      onProgress={action('progress')}
      onSuccess={action('success')}
      onError={(e, file) => console.log(e, file)}
      beforeUpload={file => {
        const newFile = new File([file], 'file', { type: file.type })
        return Promise.resolve(newFile)
      }}
      defaultFileList={defaultFileList}
    />
  ))
