import classNames from 'classnames'
import React from 'react'
import styles from './Spinner.css'

interface SpinnerProps {
    size?: 's' | 'm' | 'l'
    overlay?: boolean
}

type AllProps = SpinnerProps & React.HTMLAttributes<HTMLDivElement>

const Spinner: React.FC<AllProps> = ({ size = 'm', className, overlay, children, ...rest }) => {
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
