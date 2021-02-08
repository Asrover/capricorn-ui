import React from 'react'
import styles from './Dropdown.css'
import classNames from 'classnames'

interface DropdownProps {
    active?: boolean
    position?: 'right' | 'bottom'
    autoMaxHeight?: boolean
    noPadding?: boolean
    widthAuto?: boolean
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
            >
                {children}
            </div>
        </div>
    )
}

export default Dropdown
