import React from 'react'
import styles from './Dropdown.css'
import classNames from 'classnames'

export interface DropdownProps {
    active?: boolean
    position?: 'right' | 'bottom'
    autoMaxHeight?: boolean
    noPadding?: boolean
    widthAuto?: boolean
    minWidth?: number
}

type AllProps = DropdownProps & React.HTMLAttributes<HTMLDivElement>

// Todo: to Transition Group

const Dropdown: React.FC<AllProps> = ({
    active,
    widthAuto,
    autoMaxHeight,
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
                    [styles.autoMaxHeight]: autoMaxHeight,
                    [styles.noPadding]: noPadding,
                })}
                style={{ minWidth: minWidth || 'auto' }}
            >
                {children}
            </div>
        </div>
    )
}

export default Dropdown
