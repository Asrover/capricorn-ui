import React from 'react'
import classNames from 'classnames'
import styles from './Space.css'

interface SpaceProps {
    size?: 's' | 'm' | 'l' | 'space-between'
    /** Align items */
    align?: 'flex-start' | 'flex-end' | 'center' | 'baseline'
    column?: boolean
    wrap?: boolean
}

type AllProps = SpaceProps & React.HTMLAttributes<HTMLDivElement>

const Index: React.FC<AllProps> = ({ size = 'm', align, wrap, column, children, ...rest }) => {
    return (
        <div
            className={classNames({
                [styles.space]: true,
                [styles[`size-${size}`]]: true,
                [styles.column]: column,
            })}
            style={{
                alignItems: align,
                flexWrap: wrap ? 'wrap' : undefined,
            }}
            {...rest}
        >
            {children}
        </div>
    )
}

export const Space = Index
