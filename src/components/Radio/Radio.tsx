import React from 'react'
import styles from './Radio.css'
import AlertSvg from '../../../assets/alert.svg'
import classNames from 'classnames'

export interface RadioProps extends Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'> {
    error?: string
    value: string | number
    disabled?: boolean
}

const InternalRadio: React.ForwardRefRenderFunction<HTMLElement, RadioProps> = (
    { error, disabled, children, ...rest },
    ref,
) => {
    return (
        <label
            className={classNames({
                [styles.radio]: true,
                [styles.disabled]: disabled,
                [styles.hasError]: Boolean(error),
            })}
        >
            <input {...rest} className={styles.input} disabled={disabled} type="radio" />
            <div
                className={classNames({
                    [styles.markBox]: true,
                })}
            />
            <span
                className={classNames({
                    [styles.label]: true,
                })}
            >
                {children}
            </span>
            {Boolean(error) && (
                <div className={styles.error}>
                    <AlertSvg height={14} />
                    {error}
                </div>
            )}
        </label>
    )
}

export const Radio = React.forwardRef<unknown, RadioProps>(InternalRadio)
export default Radio
