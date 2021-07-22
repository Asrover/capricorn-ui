import React from 'react'
import styles from './Link.css'
import classNames from 'classnames'

export interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
    hoverUnderline?: boolean
    disabled?: boolean
    bold?: boolean
    component?: React.FC
}

const Link: React.FC<LinkProps> = ({
    className,
    component,
    hoverUnderline,
    onClick,
    disabled,
    bold,
    children,
    ...rest
}) => {
    const Component = component || 'a'

    return (
        <Component
            {...rest}
            className={classNames({
                [className]: Boolean(className),
                [styles.link]: true,
                [styles.hoverUnderline]: hoverUnderline,
                [styles.disabled]: disabled,
                [styles.bold]: bold,
            })}
            onClick={!disabled ? onClick : undefined}
        >
            {children}
        </Component>
    )
}

export default Link
