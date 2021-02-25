import React from 'react'
import classNames from 'classnames'
import styles from './Space.css'

interface SpaceProps {
    size?: 's' | 'm' | 'l' | number
    /** Align items */
    align?: 'flex-start' | 'flex-end' | 'center' | 'baseline'
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between'
    column?: boolean
    wrap?: boolean
}

type AllProps = SpaceProps & React.HTMLAttributes<HTMLDivElement>

const Space: React.FC<AllProps> = ({ size = 'm', align, justify, className, wrap, column, children, ...rest }) => {
    return (
        <div
            className={classNames({
                [className]: Boolean(className),
                [styles.space]: true,
                [styles[`size-${size}`]]: true,
                [styles.row]: !column,
                [styles.column]: column,
            })}
            style={{
                alignItems: align,
                justifyContent: justify,
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
