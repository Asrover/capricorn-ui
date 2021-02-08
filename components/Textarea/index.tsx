import React, { ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import styles from './Textarea.css'
import classNames from 'classnames'
import CheckMarkSvg from '../../assets/check-mark.svg'
import WarningSvg from '../../assets/warning-round.svg'

interface InputProps {
    label?: ReactNode
    value?: string
    onChange?: (value?: string) => void

    adaptiveHeight?: boolean

    onFocus?: () => void
    onBlur?: () => void
    onClick?: () => void

    /** it will overwrite rightContent */
    error?: ReactNode
    /** it will overwrite rightContent */
    success?: ReactNode
    autoFocus?: boolean
    disabled?: boolean
    fieldTip?: ReactNode
    autofocus?: boolean
    loading?: boolean
    readOnly?: boolean
    innerRef?: RefObject<HTMLTextAreaElement>
    noMarginBottom?: boolean
    fullWidth?: boolean
    maxWidth?: number
    staticLabel?: boolean
}

type AllProps = InputProps & Omit<React.HTMLAttributes<HTMLInputElement>, 'onFocus' | 'onClick' | 'onChange'>

const Textarea: React.FC<AllProps> = ({
    label,
    error,
    success,
    placeholder,
    value = '',
    disabled,
    fullWidth,
    loading,
    autoFocus,
    fieldTip,
    onChange,
    innerRef,
    onBlur,
    onFocus,
    staticLabel,
    adaptiveHeight,
    maxWidth = 360,
    ...rest
}) => {
    const [inputText, setInputText] = useState(value)
    const textareaRef: RefObject<HTMLTextAreaElement | undefined> = innerRef || useRef()
    const [focused, setFocused] = useState(false)
    const hasError = Boolean(error)
    const hasSuccess = Boolean(success)
    const hasValue = Boolean(inputText)
    const rows = value?.split('\n').length || 0

    useEffect(() => {
        setInputText(value)
    }, [value])

    useEffect(() => {
        onChange && onChange(inputText)
    }, [inputText])

    const handleFocus = (): void => {
        if (!disabled && !loading) {
            setFocused(true)
            onFocus && onFocus()
        }
    }

    const handleBlur = (): void => {
        setFocused(false)
        onBlur && onBlur()
    }

    const handleChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>): void => {
        if (!disabled) {
            setInputText(target.value)
        }
    }

    const forceFocus = (): void => {
        handleFocus()
        textareaRef.current?.focus()
    }

    useEffect(() => {
        if (autoFocus) {
            textareaRef.current?.focus()
            handleFocus()
        }
    }, [autoFocus])

    const getContent = () => (
        <div
            {...rest}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={classNames({
                [styles.textareaContainer]: true,
                [styles.focused]: focused,
                [styles.hasValue]: hasValue,
                [styles.loading]: loading,
                [styles.fullWidth]: fullWidth,
                [styles.error]: hasError,
                [styles.disabled]: disabled,
                [styles.success]: hasSuccess,
            })}
            style={{ maxWidth }}
        >
            {label && !staticLabel && (
                <label onClick={forceFocus} className={styles.label}>
                    {label}
                </label>
            )}
            <textarea
                onChange={handleChange}
                value={inputText}
                className={classNames({
                    [styles.textarea]: true,
                    [styles.adaptiveHeight]: adaptiveHeight,
                    [styles.vCenter]: staticLabel,
                    [styles.withLabel]: Boolean(label),
                })}
                rows={adaptiveHeight ? rows : undefined}
                placeholder={placeholder || undefined}
                spellCheck="false"
                ref={textareaRef}
            />
            {(hasError || hasSuccess) && (
                <div className={styles.statusIcon}>
                    {hasError && <WarningSvg width={20} />}
                    {hasSuccess && <CheckMarkSvg width={16} />}
                </div>
            )}
            {(fieldTip || error || success) && <div className={styles.fieldTip}>{error || success || fieldTip}</div>}
        </div>
    )

    return staticLabel ? (
        <div>
            {label && (
                <label
                    onClick={forceFocus}
                    className={classNames({
                        [styles.label]: true,
                        [styles.static]: true,
                    })}
                >
                    {label}
                </label>
            )}
            {getContent()}
        </div>
    ) : (
        getContent()
    )
}

export default Textarea
