import React from 'react'
import styles from './Dropdown.css'
import classNames from 'classnames'

interface DropdownProps {
    active?: boolean
    position?: 'right' | 'bottom'
}

type AllProps = DropdownProps & React.HTMLAttributes<HTMLDivElement>

// Todo: to Transition Group

const Index: React.FC<AllProps> = ({ active, position, children, ...rest }) => {
    return (
        <div
            className={classNames({
                [styles.area]: true,
                [styles.active]: active,
                [styles[`position-${position}`]]: position !== 'right',
            })}
        >
            <div
                {...rest}
                className={classNames({
                    [styles.dropdown]: true,
                })}
            >
                {children}
            </div>
        </div>
    )
}

export const Dropdown = React.memo(Index)
