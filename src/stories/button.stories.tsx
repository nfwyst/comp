import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../components/Button/button';
import { ButtonSize } from '../components/Button/button';

storiesOf('Button', module)
  .add('默认 Button', () => (
    <Button onClick={action('clicked')}>default</ Button>
  ))
  .add('button with size', () => (
    <>
      <Button size={ButtonSize.Small}>small</Button>
      <Button size={ButtonSize.Large}>large</Button>
    </>
  ))
  .add('button with style', () => (
    <>
      <Button type="primary">primary</Button>
      <Button type="danger">danger</Button>
      <Button type="link" href="http://www.baidu.com">link</Button>
    </>
  ))
