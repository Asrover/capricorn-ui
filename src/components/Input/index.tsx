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

type Option = { value: any; text: string }

interface InputProps {
    type?: InputType
    label?: ReactNode
    /** Value of text of input */
    value?: string
    onChange?: (value?: string) => void

    selectedOption?: Option
    options?: Option[]
    onChangeOptionValue?: (option?: Option) => void
    withSearch?: boolean
    optionsLikeRightLabel?: boolean
    /** options with optionsLikeRightLabel overwrite rightLabel */
    rightLabel?: string

    onFocus?: () => void
    onBlur?: () => void
    onClick?: () => void

    /** it will overwrite rightContent */
    error?: ReactNode
    /** it will overwrite rightContent */
    success?: ReactNode
    autoFocus?: boolean
    disabled?: boolean
    leftContent?: ReactNode
    clearable?: boolean
    fieldTip?: ReactNode
    autofocus?: boolean
    rightContent?: ReactNode
    loading?: boolean
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
    leftContent,
    placeholder,
    value = '',
    selectedOption = {},
    disabled,
    fullWidth,
    loading,
    smallHeight,
    rightLabel,
    clearable,
    autoFocus,
    fieldTip,
    onChange,
    optionsLikeRightLabel,
    onChangeOptionValue,
    rightContent,
    innerRef,
    onBlur,
    onFocus,
    codeLength,
    staticLabel,
    maxWidth = 360,
    withSearch,
    options,
    ...rest
}) => {
    const [inputText, setInputText] = useState(value)
    const inputRef: RefObject<HTMLInputElement | undefined> = innerRef || useRef()
    const [openedOptions, setOpenedOptions] = useState(false)
    const [typeState, setTypeState] = useState<InputType>(type)
    const [focused, setFocused] = useState(false)
    const hasLeftContent = Boolean(leftContent) || typeState === 'search'
    const hasError = Boolean(error)
    const hasSuccess = Boolean(success)
    const hasValue = Boolean(inputText)
    const hasOptions = useMemo(() => Boolean(options) && Object.keys(options).length !== 0, [options])

    useEffect(() => {
        setInputText(value)
    }, [value])

    useOutsideClick(inputRef, () => setOpenedOptions(false))

    const handleFocus = (): void => {
        if (!disabled) {
            setFocused(true)
            !optionsLikeRightLabel && setOpenedOptions(true)
            onFocus && onFocus()
        }
    }

    const handleBlur = (): void => {
        setFocused(false)
        setOpenedOptions(false)
        onBlur && onBlur()

        if (options) {
            if (options.findIndex((option) => option.text === value) === -1) {
                onChange && onChange()
            }
        }
    }

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        if (!disabled && !(hasOptions && !withSearch && !optionsLikeRightLabel)) {
            if (typeState === 'money' && isNaN(Number(target.value))) return

            setInputText(target.value)
            onChange && onChange(target.value)
            onChangeOptionValue && !optionsLikeRightLabel && onChangeOptionValue()
        }
    }

    const handleChangeOption = (option: Option, index: number) => () => {
        onChangeOptionValue && onChangeOptionValue(option)
        setFocusedOptionIndex(index)
        !optionsLikeRightLabel && setInputText(option.text)
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

    const filteredOptions = useMemo(() => {
        if (hasOptions) {
            const withoutFilter =
                !withSearch ||
                optionsLikeRightLabel ||
                options.some((option) => option.text.toLowerCase() === inputText?.toLowerCase())

            // Need also to show ALL OPTIONS in case when input text equals to option text
            return withoutFilter
                ? options
                : options.filter((option) => option.text.toLowerCase().includes(inputText?.toLowerCase() || ''))
        }
    }, [options, inputText, withSearch])

    const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1)

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (hasOptions) {
            const optionsLength = options.length - 1

            switch (event.key) {
                case 'ArrowUp':
                    setFocusedOptionIndex(focusedOptionIndex === 0 ? optionsLength : focusedOptionIndex - 1)
                    break
                case 'ArrowDown':
                    setFocusedOptionIndex(focusedOptionIndex === optionsLength ? 0 : focusedOptionIndex + 1)
                    break
                case 'Enter':
                    setInputText(options[focusedOptionIndex].text)
                    setOpenedOptions(!openedOptions)
                    onChangeOptionValue && onChangeOptionValue(options[focusedOptionIndex])
                    break
            }
        }
    }

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
                [styles.hasLeftContent]: hasLeftContent,
                [styles.cursorPointer]: hasOptions && !withSearch && !optionsLikeRightLabel,
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
                {hasLeftContent && (
                    <div onClick={forceFocus} className={styles.leftContent}>
                        {typeState === 'search' && <SearchSvg />}
                        {leftContent}
                    </div>
                )}
                <div className={styles.inputWrap}>
                    {label && !(staticLabel || type === 'code') && (
                        <label
                            onClick={forceFocus}
                            className={classNames({
                                [styles.label]: true,
                                [styles.notFocused]: hasOptions && !withSearch && !optionsLikeRightLabel,
                            })}
                        >
                            {label}
                        </label>
                    )}
                    <input
                        type={typeState === 'search' || typeState === 'money' ? 'text' : typeState}
                        onChange={handleChange}
                        value={inputText}
                        className={classNames({
                            [styles.input]: true,
                            [styles.hideCaret]:
                                (type === 'code' && inputText?.length === codeLength) ||
                                (hasOptions && !withSearch && !optionsLikeRightLabel),
                            [styles.typeCode]: type === 'code',
                            [styles.vCenter]: type === 'code' || staticLabel,
                            [styles.withLabel]: Boolean(label),
                        })}
                        maxLength={codeLength}
                        placeholder={placeholder || (type === 'code' && 'X'.repeat(codeLength))}
                        spellCheck="false"
                        ref={inputRef}
                        onKeyDown={handleKeyDown}
                    />
                    {type !== 'code' && (hasError || hasSuccess) && (
                        <div className={styles.statusIcon}>
                            {hasError && <WarningSvg width={20} />}
                            {hasSuccess && <CheckMarkSvg width={16} />}
                        </div>
                    )}
                </div>
                {hasOptions && (
                    <Dropdown
                        className={classNames({ [styles.rightMode]: optionsLikeRightLabel })}
                        active={openedOptions}
                        position="bottom"
                    >
                        {filteredOptions.length !== 0
                            ? filteredOptions.map((option, index) => (
                                  <div
                                      key={option.value}
                                      className={classNames({
                                          [styles.optionItem]: true,
                                          [styles.selected]: selectedOption.value === option.value,
                                          [styles.focused]: focusedOptionIndex === index,
                                      })}
                                      onClick={handleChangeOption(option, index)}
                                  >
                                      {selectedOption.value === option.value && <CheckMarkSvg width={12} />}
                                      {option.text}
                                  </div>
                              ))
                            : 'Items not found'}
                    </Dropdown>
                )}
            </div>
            {(fieldTip || error || success) && <div className={styles.fieldTip}>{error || success || fieldTip}</div>}
            {(rightContent || loading || hasOptions) && (
                <div
                    className={classNames({
                        [styles.rightIconBlock]: true,
                        [styles.opened]: openedOptions,
                    })}
                    onClick={forceFocus}
                >
                    {loading ? (
                        <LoaderSvg width={24} />
                    ) : hasOptions && !optionsLikeRightLabel ? (
                        <ChevronDownSvg width={12} />
                    ) : (
                        rightContent
                    )}
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
            {(optionsLikeRightLabel || rightLabel) && (
                <div
                    className={classNames({
                        [styles.typeLabel]: true,
                        [styles.withDropdown]: hasOptions,
                        [styles.hasLeftContent]: hasLeftContent,
                        [styles.withLabel]: Boolean(label),
                    })}
                    onClick={() => optionsLikeRightLabel && setOpenedOptions(true)}
                >
                    {selectedOption.text || rightLabel}
                    {hasOptions && (
                        <div
                            className={classNames({
                                [styles.rightIconBlock]: true,
                                [styles.opened]: openedOptions,
                            })}
                        >
                            <ChevronDownSvg width={12} />
                        </div>
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
