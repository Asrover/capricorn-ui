import React, { ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import styles from './TextInput.css'
import classNames from 'classnames'
import WarningSvg from '../../assets/warning-round.svg'
import CrossSvg from '../../assets/cross-thin.svg'
import EyeSvg from '../../assets/eye.svg'
import SearchSvg from '../../assets/search.svg'
import EyeHiddenSvg from '../../assets/eye-hidden.svg'
import CheckMarkSvg from '../../assets/check-mark.svg'
import IMask from 'imask/esm'
import Spinner from '../Spinner'

type TextInputType = 'text' | 'password' | 'money' | 'tel' | 'search' | 'code'
type TextInputView = 'default' | 'text' | 'underscore'

// TODO: Add lazy to IMASK

export interface TextInputProps
    extends Omit<React.HTMLProps<HTMLInputElement>, 'onFocus' | 'onClick' | 'onChange' | 'prefix' | 'label'> {
    type?: TextInputType
    label?: ReactNode
    value: string
    onChange: (value?: string) => void
    view?: TextInputView

    dropdownContent?: ReactNode
    rightLabel?: ReactNode

    onFocus?: () => void
    onBlur?: () => void
    onClick?: () => void
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void

    /** it will overwrite suffix */
    error?: ReactNode
    /** it will overwrite suffix */
    success?: ReactNode
    autoFocus?: boolean
    disabled?: boolean
    prefix?: ReactNode
    suffix?: ReactNode
    clearable?: boolean
    fieldTip?: ReactNode
    autofocus?: boolean
    loading?: boolean
    readOnly?: boolean
    innerRef?: RefObject<HTMLInputElement>
    /** Required with type=code */
    codeLength?: number
    fullWidth?: boolean
    maxWidth?: number
    smallHeight?: boolean
    staticLabel?: boolean
    mask?: string
    disableTyping?: boolean
    textInputStyles?: Record<string, string | number>
}

const TextInput: React.FC<TextInputProps> = ({
    name,
    label,
    type = 'text',
    view = 'default',
    error,
    success,
    prefix,
    placeholder,
    value = '',
    onKeyDown,
    dropdownContent,
    disabled,
    fullWidth,
    loading,
    smallHeight,
    rightLabel,
    clearable,
    autoFocus,
    fieldTip,
    onChange,
    suffix,
    innerRef,
    onBlur,
    onFocus,
    codeLength,
    staticLabel,
    maxWidth = 360,
    mask,
    disableTyping,
    style,
    textInputStyles,
    className,
    ...rest
}) => {
    const inputRef: RefObject<HTMLInputElement | undefined> = innerRef || useRef()
    const [typeState, setTypeState] = useState<TextInputType>(type)
    const [focused, setFocused] = useState(false)
    const hasPrefix = Boolean(prefix) || typeState === 'search'
    const hasError = Boolean(error)
    const hasSuccess = Boolean(success)
    const hasValue = Boolean(value)
    const maskRef = useRef<IMask>()

    useEffect(() => {
        if (mask) {
            maskRef.current = IMask(inputRef.current, { mask })
        }

        return function cleanup() {
            maskRef.current?.destroy()
        }
    }, [mask])

    const handleFocus = () => {
        if (!disabled && !loading) {
            setFocused(true)
            onFocus && onFocus()
        }
    }

    const handleBlur = () => {
        setFocused(false)
        onBlur && onBlur()
    }

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        if (!disabled && !disableTyping) {
            if (typeState === 'money' && isNaN(Number(target.value))) return
            onChange(target.value)
        }
    }

    const forceFocus = () => {
        handleFocus()
        inputRef.current?.focus()
    }

    useEffect(() => {
        if (autoFocus) {
            inputRef.current?.focus()
            handleFocus()
        }
    }, [autoFocus])

    const clearText = () => {
        onChange('')
        forceFocus()
    }

    const getContent = () => (
        <div
            {...rest}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={classNames({
                [className]: Boolean(className),
                [styles.inputContainer]: true,
                [styles.focused]: focused,
                [styles.hasValue]: hasValue,
                [styles.smallHeight]: smallHeight,
                [styles.loading]: loading,
                [styles.fullWidth]: fullWidth,
                [styles.error]: hasError,
                [styles.disabled]: disabled,
                [styles.success]: hasSuccess,
                [styles.hasPrefix]: hasPrefix,
                [styles[`view-${view}`]]: true,
            })}
            style={{ ...style, maxWidth: codeLength ? codeLength * 60 : maxWidth }}
        >
            {type === 'code' && (
                <div className={styles.numberDelimiter}>
                    {Array.from(Array(codeLength - 1).keys()).map((value) => (
                        <div
                            className={styles.codeDelimiter}
                            key={value}
                            style={{ marginLeft: `calc(${100 / codeLength}% - 1px)` }}
                        />
                    ))}
                </div>
            )}
            <div className={styles.inputBox}>
                {hasPrefix && (
                    <div onClick={forceFocus} className={styles.prefix}>
                        {typeState === 'search' && <SearchSvg />}
                        {prefix}
                    </div>
                )}
                <div className={styles.inputWrap}>
                    {label && !(staticLabel || type === 'code') && (
                        <label onClick={forceFocus} className={styles.label}>
                            {label}
                        </label>
                    )}
                    <input
                        {...rest}
                        name={name}
                        type={typeState === 'search' || typeState === 'money' ? 'text' : typeState}
                        onChange={handleChange}
                        value={value}
                        className={classNames({
                            [styles.input]: true,
                            [styles.hideCaret]: (type === 'code' && value?.length === codeLength) || loading,
                            [styles.typeCode]: type === 'code',
                            [styles.vCenter]: type === 'code' || staticLabel,
                            [styles.withLabel]: Boolean(label),
                        })}
                        maxLength={codeLength}
                        placeholder={placeholder || (type === 'code' && 'X'.repeat(codeLength)) || undefined}
                        spellCheck="false"
                        ref={inputRef}
                        onKeyDown={onKeyDown}
                        style={{ ...textInputStyles }}
                    />
                    {type !== 'code' && (hasError || hasSuccess) && (
                        <div className={styles.statusIcon}>
                            {hasError && <WarningSvg width={20} />}
                            {hasSuccess && <CheckMarkSvg width={16} />}
                        </div>
                    )}
                </div>
                {dropdownContent}
            </div>
            {(fieldTip || error || success) && <div className={styles.fieldTip}>{error || success || fieldTip}</div>}
            {(suffix || loading || (clearable && hasValue) || type === 'password') && (
                <div
                    className={styles.suffix}
                    onClick={
                        clearable
                            ? clearText
                            : type === 'password'
                            ? () => setTypeState(typeState === 'password' ? 'text' : 'password')
                            : forceFocus
                    }
                >
                    {clearable && hasValue ? (
                        <CrossSvg width={10} />
                    ) : loading ? (
                        <Spinner size="s" />
                    ) : type === 'password' ? (
                        typeState === 'text' ? (
                            <EyeSvg width={16} />
                        ) : (
                            <EyeHiddenSvg width={16} />
                        )
                    ) : (
                        suffix
                    )}
                </div>
            )}
            {rightLabel && (
                <div
                    className={classNames({
                        [styles.typeLabel]: true,
                        [styles.hasPrefix]: hasPrefix,
                        [styles.withLabel]: Boolean(label),
                    })}
                    onClick={forceFocus}
                >
                    {rightLabel}
                </div>
            )}
        </div>
    )

    return staticLabel || (type === 'code' && label) ? (
        <div style={{ maxWidth }}>
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

export default TextInput
