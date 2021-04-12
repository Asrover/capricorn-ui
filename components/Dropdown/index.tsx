import React from 'react'
import styles from './Dropdown.css'
import classNames from 'classnames'

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    active?: boolean
    position?: 'right' | 'bottom'
    maxHeight?: number | string
    noPadding?: boolean
    widthAuto?: boolean
    minWidth?: number
}

// Todo: to Transition Group

const Dropdown: React.FC<DropdownProps> = ({
    active,
    widthAuto,
    maxHeight,
    noPadding,
    className,
    position,
    children,
    minWidth,
    ...rest
}) => {
    return (
        <div
            {...rest}
            className={classNames({
                [className]: Boolean(className),
                [styles.area]: true,
                [styles.active]: active,
                [styles[`position-${position}`]]: position !== 'right',
                [styles.widthAuto]: widthAuto,
            })}
        >
            <div
                className={classNames({
                    [styles.dropdown]: true,
                    [styles.noPadding]: noPadding,
                })}
                style={{ minWidth: minWidth || 'auto', maxHeight: maxHeight || 150 }}
            >
                {children}
            </div>
        </div>
    )
}

export default Dropdown
