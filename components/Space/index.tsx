import React from 'react'
import classNames from 'classnames'
import styles from './Space.css'

interface SpaceProps {
    size?: 's' | 'm' | 'l' | 'space-between' | number
    /** Align items */
    align?: 'flex-start' | 'flex-end' | 'center' | 'baseline'
    column?: boolean
    wrap?: boolean
}

type AllProps = SpaceProps & React.HTMLAttributes<HTMLDivElement>

const Space: React.FC<AllProps> = ({ size = 'm', align, wrap, column, children, ...rest }) => {
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
            {typeof size === 'string'
                ? children
                : Array.isArray(children) &&
                  children.map((item, index) =>
                      React.cloneElement(item as React.ReactElement, {
                          style: {
                              marginRight: !column && index !== children.length - 1 && size,
                              marginBottom: column && index !== children.length - 1 && size,
                          },
                      }),
                  )}
        </div>
    )
}

export default Space
