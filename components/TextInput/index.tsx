import React, { MutableRefObject, ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import styles from './TextInput.css'
import classNames from 'classnames'
import WarningSvg from '../../assets/warning-round.svg'
import CrossSvg from '../../assets/cross-thin.svg'
import EyeSvg from '../../assets/eye.svg'
import SearchSvg from '../../assets/search.svg'
import EyeHiddenSvg from '../../assets/eye-hidden.svg'
import CheckMarkSvg from '../../assets/check-mark-round.svg'
import IMask from 'imask/esm'
import Spinner from '../Spinner'

type TextInputType = 'text' | 'password' | 'money' | 'tel' | 'search' | 'code' | 'number'
type TextInputView = 'default' | 'text' | 'underscore'

// TODO: Add lazy to IMASK
// TODO: CodeInput to separate component

export interface TextInputProps
    extends Omit<React.HTMLProps<HTMLInputElement>, 'onFocus' | 'onClick' | 'onChange' | 'prefix' | 'label'> {
    type?: TextInputType
    label?: ReactNode
    value: string
    onChange: (value?: string) => void
    view?: TextInputView

    dropdownContent?: ReactNode
    rightLabel?: ReactNode

    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
    onMouseDown?: (event: React.MouseEvent<HTMLInputElement>) => void

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
    innerContainerRef?: RefObject<HTMLDivElement>
    innerRef?: RefObject<HTMLInputElement>
    /** Required with type=code */
    codeLength?: number
    fullWidth?: boolean
    maxWidth?: number
    smallHeight?: boolean
    staticLabel?: boolean
    disableTyping?: boolean
    textInputStyles?: Record<string, string | number>

    maskRef?: MutableRefObject<IMask>
    mask?: string | DateConstructor
    pattern?: string
    blocks?: Record<string, any>
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
    onMouseDown,
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
    innerContainerRef,
    onBlur,
    onFocus,
    codeLength,
    staticLabel,
    maxWidth = 360,
    maskRef,
    mask,
    disableTyping,
    style,
    textInputStyles,
    className,
    blocks,
    pattern,
    ...rest
}) => {
    const inputRef: RefObject<HTMLInputElement | undefined> = innerRef || useRef()
    const containerRef: RefObject<HTMLDivElement | undefined> = innerContainerRef || useRef()

    const [typeState, setTypeState] = useState<TextInputType>(type)
    const [focused, setFocused] = useState(false)
    const hasPrefix = Boolean(prefix) || typeState === 'search'
    const hasError = Boolean(error)
    const hasSuccess = Boolean(success)
    const hasValue = Boolean(value)
    const innerMaskRef = maskRef || useRef<IMask>()

    useEffect(() => {
        if (mask) {
            innerMaskRef.current = IMask(inputRef.current, { mask })
            innerMaskRef.current.on('accept', () => {
                onChange(maskRef.current.value)
            })
        }

        return function cleanup() {
            mask && innerMaskRef.current?.destroy()
        }
    }, [])

    useEffect(() => {
        if (innerMaskRef.current) {
            innerMaskRef.current.updateOptions({ mask, blocks, pattern })
        }
    }, [mask])

    useEffect(() => {
        if (mask && innerMaskRef.current) {
            if (
                value !== innerMaskRef.current.value ||
                (typeof innerMaskRef.current.value !== 'string' &&
                    innerMaskRef.current.value === '' &&
                    !innerMaskRef.current.el.isActive)
            ) {
                innerMaskRef.current.maskValue = value == null ? '' : value
            }
        }
    }, [value])

    const handleFocus = (e) => {
        if (!disabled && !loading) {
            setFocused(true)
            onFocus && onFocus(e)
        }
    }

    const handleBlur = (e) => {
        setFocused(false)
        onBlur && onBlur(e)
    }

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        if (!disabled && !disableTyping && !mask) {
            if (typeState === 'money' && isNaN(Number(target.value))) return
            onChange(target.value)
        }
    }

    const forceFocus = () => {
        inputRef.current?.focus()
    }

    useEffect(() => {
        if (autoFocus) {
            forceFocus()
        }
    }, [autoFocus])

    const clearText = () => {
        onChange('')
    }

    const getContent = () => (
        <div
            {...rest}
            ref={containerRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseDown={onMouseDown}
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
                [styles.disableTyping]: disableTyping,
                [styles.typeCode6]: type === 'code' && codeLength === 6,
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
                    <div className={styles.prefix}>
                        {typeState === 'search' && !prefix && <SearchSvg />}
                        {prefix}
                    </div>
                )}
                <div className={styles.inputWrap}>
                    {label && !(staticLabel || type === 'code') && <label className={styles.label}>{label}</label>}
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
                            [styles.typeCode6]: type === 'code' && codeLength === 6,
                            [styles.vCenter]: type === 'code' || staticLabel,
                            [styles.withLabel]: Boolean(label),
                        })}
                        maxLength={codeLength}
                        placeholder={placeholder || (type === 'code' && 'X'.repeat(codeLength)) || undefined}
                        spellCheck="false"
                        ref={inputRef}
                        onKeyDown={onKeyDown}
                        style={textInputStyles}
                    />
                </div>
                {dropdownContent}
            </div>
            {(fieldTip || error || success) && <div className={styles.fieldTip}>{error || success || fieldTip}</div>}
            {(suffix ||
                loading ||
                (clearable && hasValue) ||
                type === 'password' ||
                (type !== 'code' && (hasError || hasSuccess))) && (
                <div
                    className={styles.suffix}
                    onClick={
                        clearable
                            ? clearText
                            : type === 'password'
                            ? () => setTypeState(typeState === 'password' ? 'text' : 'password')
                            : () => {}
                    }
                >
                    {type !== 'code' && (hasError || hasSuccess) ? (
                        <div className={styles.statusIcon}>
                            {hasError && <WarningSvg width={22} />}
                            {hasSuccess && <CheckMarkSvg width={22} />}
                        </div>
                    ) : clearable && hasValue ? (
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
