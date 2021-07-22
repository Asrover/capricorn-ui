import React from 'react'
import styles from './Dropdown.css'
import classNames from 'classnames'
import useWindowSize from 'react-use/esm/useWindowSize'

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    active?: boolean
    position?: 'right' | 'bottom' | 'top'
    maxHeight?: number | string
    noPadding?: boolean
    widthAuto?: boolean
    minWidth?: number
    toggleFullScreenWhenMobile?: boolean
    noArrow?: boolean
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
    toggleFullScreenWhenMobile,
    noArrow,
    ...rest
}) => {
    const windowWidth = useWindowSize().width

    return (
        <div
            {...rest}
            className={classNames({
                [className]: Boolean(className),
                [styles.area]: true,
                [styles.active]: active,
                [styles[`position-${position}`]]: position !== 'right',
                [styles.widthAuto]: widthAuto,
                [styles.noArrow]: noArrow,
                [styles.fullScreen]: toggleFullScreenWhenMobile && windowWidth < 600,
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
