import React from 'react'
import styles from './Link.css'
import classNames from 'classnames'
import { Link as ReactLink } from 'react-router-dom'

interface LinkProps {
    /** for external links */
    href?: string
    /** for inner links (React Router DOM)*/
    to?: string
    hoverUnderline?: boolean
    disabled?: boolean
    bold?: boolean
}

type AllProps = LinkProps & React.HTMLAttributes<HTMLLinkElement>

const Link: React.FC<AllProps> = ({ href, className, hoverUnderline, onClick, disabled, bold, children, ...rest }) => {
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
