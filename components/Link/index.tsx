import React from 'react'
import styles from './Link.css'
import classNames from 'classnames'
import { Link as ReactLink } from 'react-router-dom'

interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
    /** for inner links (React Router DOM)*/
    to?: string
    hoverUnderline?: boolean
    disabled?: boolean
    bold?: boolean
}

const Link: React.FC<LinkProps> = ({ href, className, hoverUnderline, onClick, disabled, bold, children, ...rest }) => {
    const Component = href ? 'a' : ReactLink

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
