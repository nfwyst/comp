import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Input from '../components/Input/input';

storiesOf('Input', module)
  .add('默认 input', () => (
    <Input onClick={action('clicked')} />
  ))
  .add('button with size', () => (
    <>
      <Input size="lg" />
      <Input size="sm" />
    </>
  ))
  .add('button with prepend', () => (
    <>
      <Input prepend="baidu" />
      <Input append=".com" value="google" />
    </>
  ))
