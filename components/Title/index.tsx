import React from 'react'
import classNames from 'classnames'
import styles from './Title.css'

export type TitleProps = {
    level?: 1 | 2 | 3 | 4 | 5
} & React.HTMLAttributes<HTMLHeadingElement>

const Title: React.FC<TitleProps> = ({ level = 1, children, className, ...rest }) => {
    return (
        <div
            {...rest}
            className={classNames({
                [className]: Boolean(className),
                [styles.title]: true,
                [styles[`level-${level}`]]: true,
            })}
        >
            {children}
        </div>
    )
}

export default Title
