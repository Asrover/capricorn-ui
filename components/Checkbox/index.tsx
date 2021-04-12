import React, { ChangeEvent } from 'react'
import styles from './Checkbox.css'
import CheckSvg from '../../assets/check-mark.svg'
import AlertSvg from '../../assets/alert.svg'
import classNames from 'classnames'

export interface CheckboxProps extends Omit<React.HTMLAttributes<HTMLLabelElement>, 'onChange'>{
    onChange: (value: boolean) => void
    checked: boolean
    disabled?: boolean
    error?: React.ReactNode
}

const Checkbox: React.FC<CheckboxProps> = ({ error, checked, className, disabled, children, onChange, ...rest }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        onChange(!checked)
    }

    return (
        <label
            {...rest}
            className={classNames({
                [className]: Boolean(className),
                [styles.checkbox]: true,
                [styles.disabled]: disabled,
                [styles.hasError]: Boolean(error),
            })}
        >
            <div
                className={classNames({
                    [styles.markBox]: true,
                    [styles.checked]: checked,
                })}
            >
                <CheckSvg />
            </div>
            <input disabled={disabled} checked={checked} onChange={handleChange} type="checkbox" />
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

export default Checkbox
