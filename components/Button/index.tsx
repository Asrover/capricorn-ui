import React from 'react'
import classNames from 'classnames'
import styles from './Button.css'
import LeftArrowSvg from 'assets/left-arrow.svg'

type Skin = 'default' | 'action' | 'border' | 'pseudo' | 'back' | 'link'

type Size = 's' | 'm' | 'l' | 'xl'

interface ButtonProps {
    type?: 'submit' | 'button'
    skin?: Skin
    size?: Size
    disabled?: boolean
    loading?: boolean
    onClick?: () => void
}

type AllProps = ButtonProps & Omit<React.HTMLAttributes<HTMLButtonElement>, 'loading' | 'onClick'>

// Todo: icon before after text node

const Index: React.FC<AllProps> = ({
    size = 'l',
    skin = 'action',
    type = 'button',
    loading,
    disabled,
    children,
    onClick,
    ...rest
}) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        if (!loading && !disabled) {
            onClick && onClick()
        } else {
            e.preventDefault()
        }
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
    }

    return (
        <button
            {...rest}
            type={type}
            disabled={disabled}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            className={classNames({
                [styles.button]: true,
                [styles.loading]: loading,
                // Просто избавляемся от лишнего класса
                [styles[`size-${size}`]]: size !== 'l',
                [styles[`skin-${skin}`]]: true,
            })}
        >
            {skin === 'back' && <LeftArrowSvg />}
            {children}
        </button>
    )
}

export const Button = Index
