import React from 'react'
import styles from './Surface.css'

interface SurfaceProps {
    padding?: number
}

const Surface: React.FC<SurfaceProps & React.HTMLAttributes<HTMLDivElement>> = ({ children, padding = 30, ...rest }) => {
    return (
        <div className={styles.surface} style={{ padding }} {...rest}>
            {children}
        </div>
    )
}

export default Surface
