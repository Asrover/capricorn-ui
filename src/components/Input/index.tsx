import React, { ReactNode, RefObject, useEffect, useMemo, useRef, useState } from 'react'
import styles from './Input.css'
import classNames from 'classnames'
import CheckMarkSvg from '../../../assets/check-mark.svg'
import WarningSvg from '../../../assets/warning-round.svg'
import LoaderSvg from '../../../assets/h-loader.svg'
import CrossSvg from '../../../assets/cross-thin.svg'
import EyeSvg from '../../../assets/eye.svg'
import SearchSvg from '../../../assets/search.svg'
import EyeHiddenSvg from '../../../assets/eye-hidden.svg'
import ChevronDownSvg from '../../../assets/chevron-down.svg'
import { useOutsideClick } from '../../../utils/useOutsideClick'
import { Dropdown } from '../Dropdown'

type InputType = 'text' | 'password' | 'money' | 'tel' | 'search' | 'code'

type Option = { value: string; text: string }

interface InputProps {
    type?: InputType
    label?: ReactNode
    /** Value of text of input */
    value?: string
    optionValue?: Option
    onChange?: (value?: string) => void
    onChangeOption?: (value?: string) => void

    onFocus?: () => void
    onBlur?: () => void
    onClick?: () => void
    onChangeTypeLabel?: (option: Option) => void

    error?: ReactNode
    success?: ReactNode
    autoFocus?: boolean
    typeLabel?: ReactNode
    typeLabelOptions?: Option[]
    options: Option[]
    disabled?: boolean
    leftIcon?: ReactNode
    clearable?: boolean
    fieldTip?: ReactNode
    autofocus?: boolean
    loading?: boolean
    rightIcon?: ReactNode
    readOnly?: boolean
    innerRef?: RefObject<HTMLInputElement>
    /** Required with type=code */
    codeLength?: number
    noMarginBottom?: boolean
    fullWidth?: boolean
    maxWidth?: number
    smallHeight?: boolean
    staticLabel?: boolean
}

type AllProps = InputProps & Omit<React.HTMLAttributes<HTMLInputElement>, 'onFocus' | 'onClick' | 'onChange'>

const Index: React.FC<AllProps> = ({
    label,
    type = 'text',
    error,
    success,
    leftIcon,
    placeholder,
    value,
    optionValue,
    disabled,
    fullWidth,
    loading,
    smallHeight,
    clearable,
    autoFocus,
    fieldTip,
    onChange,
    onChangeTypeLabel,
    onChangeOption,
    rightIcon,
    innerRef,
    typeLabelOptions,
    typeLabel,
    onBlur,
    onFocus,
    codeLength,
    staticLabel,
    maxWidth = 360,
    options,
    ...rest
}) => {
    const [inputText, setInputText] = useState(value)
    const inputRef: RefObject<HTMLInputElement | undefined> = innerRef || useRef()
    const [openedLabel, setOpenedLabels] = useState(false)
    const [openedOptions, setOpenedOptions] = useState(false)
    const [typeState, setTypeState] = useState<InputType>(type)
    const [focused, setFocused] = useState(false)
    const hasLeftIcon = Boolean(leftIcon) || typeState === 'search'
    const hasError = Boolean(error)
    const hasSuccess = Boolean(success)
    const hasValue = Boolean(inputText)

    useEffect(() => {
        setInputText(value)
    }, [value])

    useOutsideClick(inputRef, () => setOpenedLabels(false))

    const handleFocus = (): void => {
        if (!disabled) {
            setFocused(true)
            setOpenedOptions(true)
            onFocus && onFocus()
        }
    }

    const handleBlur = (): void => {
        setFocused(false)
        setOpenedOptions(false)
        setOpenedLabels(false)
        onBlur && onBlur()

        if (options) {
            if (options.findIndex((option) => option.text === value) === -1) {
                onChange && onChange()
            }
        }
    }

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        if (!disabled) {
            if (typeState === 'money' && isNaN(Number(target.value))) return

            setInputText(target.value)
            onChange && onChange(value)
        }
    }

    const forceFocus = (): void => {
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
        setInputText('')
        onChange && onChange('')
        forceFocus()
    }

    const filteredOptions = useMemo(
        () => options && options.filter((option) => option.text.toLowerCase().includes(value?.toLowerCase() || '')),
        [[options, value]],
    )

    const getContent = () => (
        <div
            {...rest}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={classNames({
                [styles.inputContainer]: true,
                [styles.focused]: focused,
                [styles.hasValue]: hasValue,
                [styles.smallHeight]: smallHeight,
                [styles.loading]: loading,
                [styles.fullWidth]: fullWidth,
                [styles.error]: hasError,
                [styles.disabled]: disabled,
                [styles.success]: hasSuccess,
                [styles.hasLeftIcon]: hasLeftIcon,
            })}
            style={{ maxWidth: codeLength ? codeLength * 60 : maxWidth }}
        >
            {type === 'code' && (
                <div className={styles.numberDelimiter}>
                    {[...Array(codeLength - 1).keys()].map((value) => (
                        <div
                            className={styles.codeDelimiter}
                            key={value}
                            style={{ marginLeft: `calc(${100 / codeLength}% - 1px)` }}
                        />
                    ))}
                </div>
            )}
            <div className={styles.inputBox}>
                {hasLeftIcon && (
                    <div onClick={forceFocus} className={styles.leftIcon}>
                        {typeState === 'search' && <SearchSvg />}
                        {leftIcon}
                    </div>
                )}
                <div className={styles.inputWrap}>
                    {label && !(staticLabel || type === 'code') && (
                        <label onClick={forceFocus} className={styles.label}>
                            {label}
                        </label>
                    )}
                    <input
                        type={typeState === 'search' || typeState === 'money' ? 'text' : typeState}
                        onChange={handleChange}
                        value={inputText}
                        className={classNames({
                            [styles.input]: true,
                            [styles.hideCaret]: type === 'code' && inputText?.length === codeLength,
                            [styles.typeCode]: type === 'code',
                            [styles.vCenter]: type === 'code' || staticLabel,
                            [styles.withLabel]: Boolean(label),
                        })}
                        maxLength={codeLength}
                        placeholder={placeholder || (type === 'code' && 'X'.repeat(codeLength))}
                        spellCheck="false"
                        ref={inputRef}
                    />
                    {type !== 'code' && (hasError || hasSuccess) && (
                        <div className={styles.statusIcon}>
                            {hasError && <WarningSvg width={20} />}
                            {hasSuccess && <CheckMarkSvg width={16} />}
                        </div>
                    )}
                </div>
                {Boolean(options) && (
                    <Dropdown active={openedOptions} position="bottom">
                        {filteredOptions.length !== 0
                            ? filteredOptions.map((label) => (
                                  <div
                                      key={label.value}
                                      className={classNames({
                                          [styles.labelItem]: true,
                                          [styles.selected]: optionValue === label.value,
                                      })}
                                      onClick={() => onChangeOption && onChangeOption(label.value)}
                                  >
                                      {optionValue === label.value && <CheckMarkSvg width={12} />}
                                      {label.text}
                                  </div>
                              ))
                            : 'Items not found'}
                    </Dropdown>
                )}
            </div>
            {(fieldTip || error || success) && <div className={styles.fieldTip}>{error || success || fieldTip}</div>}
            {(rightIcon || loading || Boolean(options)) && (
                <div
                    className={classNames({
                        [styles.rightIconBlock]: true,
                        [styles.opened]: openedOptions,
                    })}
                    onClick={forceFocus}
                >
                    {loading ? <LoaderSvg width={24} /> : Boolean(options) ? <ChevronDownSvg width={12} /> : rightIcon}
                </div>
            )}
            {clearable && Boolean(value) && (
                <div className={styles.rightIconBlock} onClick={clearText}>
                    <CrossSvg width={10} />
                </div>
            )}
            {type === 'password' && (
                <div
                    className={styles.rightIconBlock}
                    onClick={() => setTypeState(typeState === 'password' ? 'text' : 'password')}
                >
                    {typeState === 'text' ? <EyeSvg width={16} /> : <EyeHiddenSvg width={16} />}
                </div>
            )}
            {typeLabel && (
                <div
                    className={classNames({
                        [styles.typeLabel]: true,
                        [styles.withDropdown]: Boolean(typeLabelOptions),
                        [styles.hasLeftIcon]: hasLeftIcon,
                        [styles.withLabel]: Boolean(label),
                    })}
                    onClick={() => setOpenedLabels((opened) => !opened)}
                >
                    {typeLabel}
                    {typeLabelOptions && (
                        <>
                            <div
                                className={classNames({
                                    [styles.rightIconBlock]: true,
                                    [styles.opened]: openedLabel,
                                })}
                            >
                                <ChevronDownSvg width={12} />
                            </div>
                            <Dropdown active={openedLabel} position="bottom">
                                {typeLabelOptions.map((label) => (
                                    <div
                                        key={label.value}
                                        className={classNames({
                                            [styles.labelItem]: true,
                                            [styles.selected]: typeLabel === label.text,
                                        })}
                                        onClick={() => onChangeTypeLabel && onChangeTypeLabel(label)}
                                    >
                                        {typeLabel === label.text && <CheckMarkSvg width={12} />}
                                        {label.text}
                                    </div>
                                ))}
                            </Dropdown>
                        </>
                    )}
                </div>
            )}
        </div>
    )

    return staticLabel || type === 'code' ? (
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

export const Input = React.memo(Index)
