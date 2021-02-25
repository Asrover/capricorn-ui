import React from 'react'
import styles from './Surface.css'
import classNames from 'classnames'

interface SurfaceProps {
    padding?: number
}

const Surface: React.FC<SurfaceProps & React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    className,
    padding = 30,
    ...rest
}) => {
    return (
        <div
            className={classNames({ [className]: Boolean(className), [styles.surface]: true })}
            style={{ padding }}
            {...rest}
        >
            {children}
        </div>
    )
}

export default Surface
