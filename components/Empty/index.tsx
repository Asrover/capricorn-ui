import React from 'react'
import classNames from 'classnames'
import styles from './Empty.css'
import EmptySvg from 'assets/file-tray-outline.svg'

interface SurfaceProps {
    size?: 's' | 'm' | 'l'
    overlay?: boolean
}

type AllProps = SurfaceProps & React.HTMLAttributes<HTMLDivElement>

const Index: React.FC<AllProps> = ({ size = 'm', overlay, children, ...rest }) => {
    return (
        <div
            className={classNames({
                [styles.empty]: true,
            })}
            {...rest}
        >
            <EmptySvg width={64} />
            {children || 'Здесь ничего нет'}
        </div>
    )
}

export const Empty = React.memo(Index)
