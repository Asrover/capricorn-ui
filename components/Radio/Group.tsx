import React, { ChangeEvent } from 'react'
import styles from './Radio.css'
import AlertSvg from '../../assets/alert.svg'
import classNames from 'classnames'

export type RadioValueType = string | number | boolean

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    name: string
    onChange: (value: RadioValueType) => void
    label?: string
    value?: RadioValueType
    vertical?: boolean
    error?: React.ReactNode
}

const Index: React.FC<RadioGroupProps> = ({
    value,
    className,
    vertical,
    error,
    name,
    label,
    onChange,
    children,
    ...rest
}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { name, defaultChecked: child.props.value === value })
        }
        return child
    })

    return (
        <div
            {...rest}
            onChange={handleChange}
            className={classNames({
                [className]: Boolean(className),
                [styles.group]: true,
                [styles.vertical]: vertical,
                [styles.hasError]: Boolean(error),
            })}
        >
            {label && <div className={styles.groupLabel}>{label}</div>}
            {childrenWithProps}
            {Boolean(error) && (
                <div className={styles.error}>
                    <AlertSvg height={14} />
                    {error}
                </div>
            )}
        </div>
    )
}

export const RadioGroup = Index
