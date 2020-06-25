import React, { FC, useState, useEffect, ReactElement } from 'react'
import classNames from 'classnames'

export interface ILetSuspenseProps {
  condition: boolean;
  children: React.ReactNode;
  checkOnce?: boolean;
  placeholder?: any;
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
    retry,
    timeout,
    className,
    style,
  } = props

  let { placeholder: Placeholder } = props
  if (!Placeholder) Placeholder = DefaultPlaceholder

  const classes = classNames('let-suspense', className)

  useEffect(() => {
    if (checkOnce && isChecked) {
      return setComponents([children])
    }

    const delay = initialDelay || 0
    let delayTimeout: NodeJS.Timeout
    let retryTimeout: NodeJS.Timeout

    if (timeout) {
      retryTimeout = setTimeout(() => {
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
      } else {
        setComponents([children])
      }
      setIsChecked(true)
    } else {
      const tempComponents = []
      for (let i = 0; i < multiplier; i++) {
        tempComponents.push(<Placeholder key={i} />)
      }
      setComponents(tempComponents)
    }
    return () => {
      clearTimeout(delayTimeout)
      clearTimeout(retryTimeout)
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
