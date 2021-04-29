import React from 'react'
import styles from './Surface.css'
import classNames from 'classnames'

interface SurfaceProps {
    padding?: number
    /** Disable hover animation */
    noSurfacing?: boolean
}

const Surface: React.FC<SurfaceProps & React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    className,
    padding = 30,
    noSurfacing,
    ...rest
}) => {
    return (
        <div
            className={classNames({
                [className]: Boolean(className),
                [styles.surface]: true,
                [styles.noSurfacing]: noSurfacing,
            })}
            style={{ padding }}
            {...rest}
        >
            {children}
        </div>
    )
}

export default Surface
