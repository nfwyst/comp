import React, { FC, useState, ChangeEvent, useCallback, ReactNode, useEffect, KeyboardEvent, useRef } from 'react';
import Input, { InputProps } from './input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import classNames from 'classnames';
import useClickOutside from '../../hooks/useClickOutside';
import { CSSTransition } from 'react-transition-group';

export interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  // 获取数据源的方法
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  // 选择某一项的回调
  onSelect?: (item: DataSourceType<any>) => void;
  /// 渲染模板
  renderOption?: (item: DataSourceType<any>) => ReactNode;
}

export const AutoComplete: FC<AutoCompleteProps> = props => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props
  const [inputVal, setInputVal] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [isLoading, setLoading] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const debouceValue = useDebounce(inputVal, 500)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  useClickOutside(componentRef, () => setSuggestions([]))
  useEffect(() => {
    if (debouceValue && triggerSearch.current) {
      const results = fetchSuggestions(debouceValue)
      if (results instanceof Promise) {
        setLoading(true)
        setSuggestions([])
        setHighlightIndex(-1)
        results.then(datas => {
          setSuggestions(datas)
          setLoading(false)
        })
      } else if (results) {
        setSuggestions(results)
      }
    }
  }, [fetchSuggestions, debouceValue])
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputVal(value)
    triggerSearch.current = true
  }, [])
  const handleSelect = useCallback((item: DataSourceType) => {
    setInputVal(item.value)
    setSuggestions([])
    if (onSelect) onSelect(item)
    triggerSearch.current = false
  }, [onSelect])
  const renderTemplate = useCallback((item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }, [renderOption])
  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13: // 回车
        if (suggestions[highlightIndex])
          handleSelect(suggestions[highlightIndex])
        break
      case 38: // 向上
        highlight(highlightIndex - 1)
        break;
      case 40: // 向下
        highlight(highlightIndex + 1)
        break
      case 27: // esc
        setSuggestions([])
        break
    }
  }
  return (
    <div className="auto-complete" ref={componentRef}>
      <Input
        value={inputVal}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      <CSSTransition
        in={!!suggestions.length}
        timeout={300}
        classNames="zoom-in-top"
        appear
        unmountOnExit
      >
        <ul>
          {isLoading && <Icon icon="spinner" spin />}
          {suggestions.map((item, index) => {
            const classes = classNames('suggestion-item', {
              'item-highlight': index === highlightIndex
            })
            return (
              <li
                key={`${index}-${typeof item === 'string' ? item : JSON.stringify(item)}`}
                className={classes}
                onClick={() => handleSelect(item)}
              >
                {renderTemplate(item)}
              </li>
            )
          })}
        </ul>
      </CSSTransition>
    </div>
  )
}

export default AutoComplete
