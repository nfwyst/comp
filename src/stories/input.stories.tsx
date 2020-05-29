import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Input from '../components/Input/input';
import { AutoComplete, DataSourceType } from '../components/Input/autoComplete';

interface dataType {
  value: string;
  url: string;
}

storiesOf('Input', module)
  .add('默认 input', () => (
    <Input onClick={action('clicked')} />
  ))
  .add('input with size', () => (
    <>
      <Input size="lg" />
      <Input size="sm" />
    </>
  ))
  .add('input with prepend', () => (
    <>
      <Input prepend="baidu" />
      <Input append=".com" value="google" />
    </>
  ))
  .add('input with icon', () => {
    return <Input icon="coffee" />
  })
  .add('autoComplete', () => {
    const fetchSuggestions = (value: string): Promise<DataSourceType<dataType>[]> => {
      return fetch(`https://api.github.com/search/users?q=${value}`)
        .then(res => res.json())
        .then(({ items }) => {
          return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
        })
    }
    return (
      <AutoComplete
        fetchSuggestions={fetchSuggestions}
        onSelect={action('selected')}
        renderOption={(item: DataSourceType<dataType>) => (
          <>
            <span>{item.value}</span>
          </>
        )}
      />
    )
  })
