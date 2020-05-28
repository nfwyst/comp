import React, {
  ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes, FC
} from 'react'
import classNames from 'classnames'

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface BaseButtonProps {
  className?: string,
  disabled?: boolean,
  size?: ButtonSize,
  type?: any,
  children: ReactNode,
  href?: string
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

export const Button: FC<ButtonProps> = props => {
  const {
    type,
    disabled,
    size,
    children,
    href,
    className,
    ...resetProps
  } = props

  const Type = type as ButtonType

  const classes = classNames('btn', className, {
    [`btn-${Type}`]: Type,
    [`btn-${size}`]: size,
    'disabled': (Type === ButtonType.Link) && disabled
  })
  if (Type === ButtonType.Link && href) {
    return (
      <a className={classes} href={href} {...resetProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...resetProps}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  type: ButtonType.Default
}

export default Button
