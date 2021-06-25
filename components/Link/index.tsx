import React from 'react'
import styles from './Link.css'
import classNames from 'classnames'

interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
    hoverUnderline?: boolean
    disabled?: boolean
    bold?: boolean
}

const Link: React.FC<LinkProps> = ({ className, hoverUnderline, onClick, disabled, bold, children, ...rest }) => {
    return (
        <a
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
        </a>
    )
}

export default Link
