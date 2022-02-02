import React from 'react'
import classNames from 'classnames'
import styles from './Space.css'

type SpaceSize = 12 | 24 | 32 | 40 | 48 | 56 | 64

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
    /** space size (horizontal for column: false, vertical for column: true) or [horizontal, vertical] */
    size?: SpaceSize | [SpaceSize, SpaceSize]
    /** Align items */
    align?: 'flex-start' | 'flex-end' | 'center' | 'baseline'
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between'
    column?: boolean
    /** Flex-wrap */
    wrap?: boolean
}

const Space: React.ForwardRefRenderFunction<unknown, SpaceProps> = (
    { size = 40, align, style, justify, className, wrap, column, children, ...rest },
    ref,
) => {
    // const [horizontalSize, verticalSize] = React.useMemo(
    //     () =>
    //         ((Array.isArray(size) ? size : [size, size]) as [SpaceSize, SpaceSize]).map(item =>
    //             getNumberSize(item),
    //         ),
    //     [size],
    // );

    return (
        <div
            ref={ref as any}
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
            {children}
        </div>
    )
}

export default React.forwardRef<unknown, SpaceProps>(Space)
