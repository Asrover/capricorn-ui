import React from 'react'
import classNames from 'classnames'
import styles from './Space.css'

interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 's' | 'm' | 'l' | number
    /** Align items */
    align?: 'flex-start' | 'flex-end' | 'center' | 'baseline'
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between'
    column?: boolean
    wrap?: boolean
}

const Space: React.FC<SpaceProps> = ({
    size = 'l',
    align,
    style,
    justify,
    className,
    wrap,
    column,
    children,
    ...rest
}) => {
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
                ...style,
                alignItems: align,
                justifyContent: justify,
                flexWrap: wrap ? 'wrap' : undefined,
            }}
            {...rest}
        >
            {typeof size === 'string'
                ? children
                : Array.isArray(children) &&
                  children.map((childrenItem, index) =>
                      React.cloneElement(childrenItem as React.ReactElement, {
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
