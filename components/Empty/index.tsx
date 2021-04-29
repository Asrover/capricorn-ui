import React from 'react'
import classNames from 'classnames'
import styles from './Empty.css'
import EmptySvg from '../../assets/file-tray-outline.svg'

export interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Text-align: center */
    center?: boolean
}

const Empty: React.FC<EmptyProps> = ({ className, center, children, ...rest }) => {
    return (
        <div
            className={classNames({
                [className]: Boolean(className),
                [styles.empty]: true,
                [styles.center]: center,
            })}
            {...rest}
        >
            <EmptySvg width={64} />
            {children || 'Здесь ничего нет'}
        </div>
    )
}

export default Empty
