import React, { FC, useState, useEffect, ReactElement } from 'react'
import classNames from 'classnames'

export interface ILetSuspenseProps {
  condition: boolean;
  children: React.ReactNode;
  checkOnce?: boolean;
  placeholder?: React.Component;
  initialDelay?: number;
  multiplier: number;
  retry?: Function;
  timeout?: number;
  className?: string;
  style?: Record<string, string>;
}

export const DefaultPlaceholder = () => {
  return (
    <div>loading...</div>
  )
}

export const LetSuspense: FC<ILetSuspenseProps> = props => {
  const [components, setComponents] = useState<React.ReactNode[]>([])
  const [isChecked, setIsChecked] = useState(false)
  const {
    condition,
    children,
    checkOnce,
    initialDelay,
    multiplier,
    placeholder: Placeholder,
    retry,
    timeout,
    className,
    style,
  } = props

  const classes = classNames('let-suspense', className)

  useEffect(() => {
    if (checkOnce && isChecked) {
      return setComponents([children])
    }

    const delay = initialDelay || 0
    let delayTimeout: NodeJS.Timeout

    if (timeout) {
      setTimeout(() => {
        if (!isChecked) {
          retry && retry()
        }
      }, timeout)
    }

    if (condition) {
      if (delay) {
        delayTimeout = setTimeout(() => {
          setComponents([children])
        }, delay)
      }
      setIsChecked(true)
    } else {
      const tempComponents = []
      for (let i = 0; i < multiplier; i++) {
        tempComponents.push(Placeholder ? Placeholder : DefaultPlaceholder)
      }
      setComponents(tempComponents)
    }
    return () => {
      clearTimeout(delayTimeout)
    }
  }, [condition, children, checkOnce, isChecked, initialDelay, multiplier, Placeholder, timeout, retry])

  return (
    <>
      {components.map((com, index) => {
        const el = React.cloneElement(com as ReactElement, {
          style,
          className: classes
        })
        return (
          <React.Fragment key={index}>{el}</React.Fragment>
        )
      })}
    </>
  )
}

export default LetSuspense
