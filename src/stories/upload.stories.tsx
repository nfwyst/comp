import React from 'react';
import { storiesOf } from '@storybook/react';
import Upload from '../components/Upload/upload';
import { action } from '@storybook/addon-actions';

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
    />
  ))
