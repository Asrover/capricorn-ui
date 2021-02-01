import classNames from 'classnames'
import React from 'react'
import styles from './Spinner.css'

interface SpinnerProps {
    size?: 's' | 'm' | 'l'
    overlay?: boolean
}

type AllProps = SpinnerProps & React.HTMLAttributes<HTMLDivElement>

const Index: React.FC<AllProps> = ({ size = 'm', overlay, children, ...rest }) => {
    return (
        <div
            className={classNames({
                [styles.spinner]: true,
                [styles.overlay]: overlay,
                [styles[`size-${size}`]]: true,
            })}
            {...rest}
        />
    )
}

export const Spinner = React.memo(Index)
