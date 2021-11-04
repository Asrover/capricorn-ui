import React, { ReactNode, RefObject, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import TextInput, { TextInputProps } from '../TextInput'
import classNames from 'classnames'
import styles from './SelectInput.css'
import ChevronDownSvg from '../../assets/chevron-down.svg'
import Dropdown, { DropdownProps } from '../Dropdown'
import CheckMarkSvg from '../../assets/check-mark.svg'
import CrossSvg from '../../assets/cross-thin.svg'
import { useWindowSize } from 'react-use/esm'

export type Option = { value: string; text: string; prefix?: ReactNode; suffix?: ReactNode; payload?: any }

interface CommonProps extends Omit<TextInputProps, 'onChange' | 'value' | 'clearable'> {
    options: Option[]
    view?: 'default' | 'text'
    onChangeInputText?: (value: string) => void
    textInputValue?: string
    withSearch?: boolean
    /** With withSearch: true it's always true */
    withTyping?: boolean
    optionsLikeRightLabel?: boolean
    /** Auto select the first option, useful in case when options are async */
    autoSelect?: boolean
    dropdownProps?: DropdownProps
}

type ConditionalProps =
    | { multiple?: false; value: Option; onChange: (value: Option | undefined) => void }
    | { multiple: true; value: Option[]; onChange: (value: Option[] | undefined) => void }

export type SelectInputProps = CommonProps & ConditionalProps

// TODO: Arrow navigation when options with scroll

const SelectInput: React.FC<SelectInputProps> = ({
    value,
    optionsLikeRightLabel,
    onChange,
    onChangeInputText,
    withSearch = false,
    withTyping = false,
    options,
    autoSelect,
    view,
    suffix,
    textInputStyles,
    textInputValue,
    dropdownProps,
    multiple,
    prefix,
    rightLabel,
    ...rest
}) => {
    const inputRef: RefObject<HTMLInputElement | undefined> = useRef()
    const width = useWindowSize().width
    const [openedOptions, setOpenedOptions] = useState(false)
    const [tillNotTypingAfterOptionsOpened, setTillNotTypingAfterOptionsOpened] = useState(true)
    const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1)
    const [inputText, setInputText] = useState(textInputValue)

    useEffect(() => {
        if (inputText !== textInputValue) {
            setInputText(textInputValue)
        }
    }, [textInputValue])

    useLayoutEffect(() => {
        if (!optionsLikeRightLabel && !multiple) {
            setInputText((value as Option)?.text)
        }
    }, [(value as Option)?.text, multiple])

    useEffect(() => {
        onChangeInputText && onChangeInputText(inputText)
    }, [inputText])

    useEffect(() => {
        if (autoSelect && options.length !== 0 && !((value as Option)?.value || (value as Option[])?.length !== 0)) {
            if (multiple) {
                onChange(options[0] as Option & Option[])
            }

            if (!optionsLikeRightLabel && onChangeInputText) {
                onChangeInputText(options[0].text)
            }
        }
    }, [options, autoSelect])

    const handleFocus = () => {
        setTillNotTypingAfterOptionsOpened(true)
        !optionsLikeRightLabel && setOpenedOptions(true)
    }

    const handleMouseDown = () => {
        if (openedOptions) {
            hideOptions()
        } else {
            openOptions()
        }
    }

    const hideOptions = () => {
        setOpenedOptions(false)
        setFocusedOptionIndex(-1)
        if (!optionsLikeRightLabel) {
            if (multiple) {
                setInputText('')
            } else {
                setInputText((value as Option)?.text)
            }
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as any)) {
                hideOptions()
            }
        }

        document.addEventListener('click', handleClickOutside)

        return function cleanup() {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [options, inputText, optionsLikeRightLabel])

    const openOptions = () => {
        setTillNotTypingAfterOptionsOpened(true)
        !optionsLikeRightLabel && setOpenedOptions(true)
    }

    const handleChangeInputText = (value: string) => {
        setInputText(value)
        setTillNotTypingAfterOptionsOpened(false)
    }

    const onClickOption = (option: Option, index: number) => () => {
        if (multiple) {
            toggleOption(option)()
        } else {
            onChange(option as Option & Option[])
        }
        setFocusedOptionIndex(index)
        !optionsLikeRightLabel && setInputText(option.text)
    }

    const toggleOption = (option: Option) => () => {
        const alreadyHasOption = (value as Option[]).findIndex((item) => item.value === option.value) !== -1

        if (alreadyHasOption) {
            onChange((value as Option[]).filter((item) => item.value !== option.value) as Option & Option[])
        } else {
            onChange([...((value as Option[]) || []), option] as Option & Option[])
        }
    }

    const filteredOptions = useMemo(() => {
        return !withSearch || optionsLikeRightLabel || tillNotTypingAfterOptionsOpened
            ? options
            : options.filter((option) => option.text.toLowerCase().includes(inputText?.toLowerCase() || ''))
    }, [options, tillNotTypingAfterOptionsOpened, inputText])

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const optionsLength = options.length - 1

        switch (event.key) {
            case 'ArrowUp':
                setFocusedOptionIndex(focusedOptionIndex === 0 ? optionsLength : focusedOptionIndex - 1)
                break
            case 'ArrowDown':
                if (!openedOptions) setOpenedOptions(true)
                setFocusedOptionIndex(focusedOptionIndex === optionsLength ? 0 : focusedOptionIndex + 1)
                break
            case 'Enter':
                if (multiple) {
                    toggleOption(options[focusedOptionIndex])()
                } else {
                    onChange(options[focusedOptionIndex] as Option & Option[])
                    setOpenedOptions(!openedOptions)
                    if (!optionsLikeRightLabel) {
                        setInputText(options[focusedOptionIndex].text)
                    }
                }
                break
        }
    }

    const selectNativeOption = (event: React.FormEvent<HTMLSelectElement>) => {
        const option = options.find((option) => option.value === event.currentTarget.value)

        if (option) {
            onClickOption(option, -1)()
        }
    }

    const getRightLabel = () => (
        <div
            onClick={() => setOpenedOptions(true)}
            className={classNames({
                [styles.rightIconBlock]: true,
                [styles.opened]: openedOptions,
            })}
        >
            {(value as Option)?.text}
            <ChevronDownSvg width={12} />
        </div>
    )

    const getDropdownContent = () =>
        width > 600 || multiple ? (
            <Dropdown
                className={classNames({ [styles.rightMode]: optionsLikeRightLabel })}
                active={openedOptions}
                position="bottom"
                widthAuto={view === 'text'}
                {...dropdownProps}
            >
                {filteredOptions.length !== 0
                    ? filteredOptions.map((option, index) => {
                          const isActive =
                              value &&
                              (multiple
                                  ? (value as Option[]).findIndex((item) => item.value === option.value) !== -1
                                  : (value as Option)?.value === option.value)

                          return (
                              <div
                                  key={option.value}
                                  className={classNames({
                                      [styles.optionItem]: true,
                                      [styles.selectedOption]: isActive,
                                      [styles.focused]: focusedOptionIndex === index,
                                  })}
                                  onMouseDown={onClickOption(option, index)}
                              >
                                  {option.prefix && <div className={styles.optionPrefix}>{option.prefix}</div>}
                                  <span style={{ flex: 1 }}>{option.text}</span>
                                  {option.suffix && <span className={styles.optionSuffix}>{option.suffix}</span>}
                                  {isActive && <CheckMarkSvg width={12} />}
                              </div>
                          )
                      })
                    : 'Items not found'}
            </Dropdown>
        ) : (
            <select
                onChange={selectNativeOption}
                value={(value as Option)?.value}
                className={classNames({
                    [styles.nativeSelect]: true,
                    [styles.nativeRightMode]: optionsLikeRightLabel,
                })}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>
        )

    const getSuffix = () =>
        !optionsLikeRightLabel && (
            <>
                {view !== 'text' && (suffix || (value as Option)?.suffix) && (
                    <div className={styles.suffixText}>{suffix || (value as Option)?.suffix}</div>
                )}
                <ChevronDownSvg
                    className={classNames({
                        [styles.chevron]: true,
                        [styles.opened]: openedOptions,
                    })}
                    width={12}
                />
            </>
        )

    const getMultiplePrefix = () => {
        return (
            value &&
            (value as Option[]).length !== 0 && (
                <div className={styles.multiplePrefix}>
                    {(value as Option[]).map((item) => (
                        <div key={item.value} className={classNames({ [styles.multiSelectItem]: true })}>
                            {item.text}
                            <CrossSvg width={8} onClick={toggleOption(item)} />
                        </div>
                    ))}
                </div>
            )
        )
    }

    return (
        <TextInput
            onFocus={handleFocus}
            onChange={handleChangeInputText}
            onKeyDown={handleKeyDown}
            onMouseDown={handleMouseDown}
            dropdownContent={getDropdownContent()}
            prefix={multiple ? getMultiplePrefix() : prefix || (value as Option)?.prefix}
            rightLabel={rightLabel || (optionsLikeRightLabel && getRightLabel())}
            suffix={getSuffix()}
            disableTyping={!withSearch && !optionsLikeRightLabel && !withTyping}
            view={view}
            value={inputText}
            innerContainerRef={inputRef}
            textInputStyles={{
                ...textInputStyles,
                width: view === 'text' && `calc(${inputText?.length * 0.7}em`,
            }}
            style={multiple ? { height: 'auto' } : {}}
            {...rest}
        />
    )
}

export default SelectInput
