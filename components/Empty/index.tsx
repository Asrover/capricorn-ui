import React from 'react'
import classNames from 'classnames'
import styles from './Empty.css'
import EmptySvg from '../../assets/file-tray-outline.svg'

interface SurfaceProps {
    size?: 's' | 'm' | 'l'
    overlay?: boolean
}

type AllProps = SurfaceProps & React.HTMLAttributes<HTMLDivElement>

const Empty: React.FC<AllProps> = ({ size = 'm', className, overlay, children, ...rest }) => {
    return (
        <div
            className={classNames({
                [className]: Boolean(className),
                [styles.empty]: true,
            })}
            {...rest}
        >
            <EmptySvg width={64} />
            {children || 'Здесь ничего нет'}
        </div>
    )
}

export default Empty
