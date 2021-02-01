import React, { ChangeEvent } from 'react'
import styles from './Checkbox.css'
import CheckSvg from 'assets/check-mark.svg'
import AlertSvg from 'assets/alert.svg'
import classNames from 'classnames'

interface CheckboxProps {
    onChange: (value: boolean) => void
    checked: boolean
    disabled?: boolean
    error?: React.ReactNode
}

type AllProps = CheckboxProps & Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'>

const Index: React.FC<AllProps> = ({ error, checked, disabled, children, onChange, ...rest }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        onChange(!checked)
    }

    return (
        <label
            className={classNames({
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
            <input {...rest} disabled={disabled} checked={checked} onChange={handleChange} type="checkbox" />
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

export const Checkbox = React.memo(Index)
