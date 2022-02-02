import classNames from 'classnames'
import React from 'react'
import styles from './Spinner.css'

export type SpinnerProps = {
    size?: 's' | 'm' | 'l'
    overlay?: boolean
} & React.HTMLAttributes<HTMLDivElement>

const Spinner: React.FC<SpinnerProps> = ({ size = 'm', className, overlay, children, ...rest }) => {
    return (
        <div
            className={classNames({
                [className]: Boolean(className),
                [styles.spinner]: true,
                [styles.overlay]: overlay,
                [styles[`size-${size}`]]: true,
            })}
            {...rest}
        />
    )
}

export default Spinner
