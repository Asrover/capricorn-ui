import React from 'react'
import classNames from 'classnames'
import styles from './Title.css'

interface TitleProps {
    level?: 1 | 2 | 3 | 4 | 5
}

type AllProps = TitleProps & React.HTMLAttributes<HTMLHeadingElement>

const Title: React.FC<AllProps> = ({ level = 1, children, className, ...rest }) => {
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
