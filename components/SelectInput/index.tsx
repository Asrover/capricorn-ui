import React, { ReactNode, RefObject, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import TextInput, { TextInputProps } from '../TextInput'
import classNames from 'classnames'
import styles from './SelectInput.css'
import ChevronDownSvg from '../../assets/chevron-down.svg'
import Dropdown, { DropdownProps } from '../Dropdown'
import CheckMarkSvg from '../../assets/check-mark.svg'
import { useWindowSize } from 'react-use/esm'

export type Option = { value: string; text: string; prefix?: ReactNode; suffix?: ReactNode; payload?: any }

export interface SelectInputProps extends Omit<TextInputProps, 'onChange' | 'value' | 'clearable'> {
    view?: 'default' | 'text'
    options: Option[]
    onChange: (option?: Option) => void
    selectedOption?: Option
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

const SelectInput: React.FC<SelectInputProps> = ({
    selectedOption = {},
    optionsLikeRightLabel,
    onChange,
    onChangeInputText,
    withSearch = false,
    withTyping = false,
    options,
    autoSelect,
    view,
    textInputStyles,
    textInputValue,
    dropdownProps,
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
        if (selectedOption?.value) {
            if (!optionsLikeRightLabel) {
                setInputText(selectedOption.text)
            }
        }
    }, [selectedOption?.value])

    useEffect(() => {
        onChangeInputText && onChangeInputText(inputText)
    }, [inputText])

    useEffect(() => {
        if (autoSelect && options.length !== 0 && !selectedOption.value) {
            onChange(options[0])

            if (!optionsLikeRightLabel && onChangeInputText) {
                onChangeInputText(options[0].text)
            }
        }
    }, [options])

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

        if (!optionsLikeRightLabel && selectedOption.value && !options.some((option) => option.text === inputText)) {
            onChange()
            setInputText('')
        }
    }

    useOutsideClick(inputRef, hideOptions)

    const openOptions = () => {
        setTillNotTypingAfterOptionsOpened(true)
        !optionsLikeRightLabel && setOpenedOptions(true)
    }

    const handleChangeInputText = (value: string) => {
        setInputText(value)
        setTillNotTypingAfterOptionsOpened(false)
    }

    const handleChangeOption = (option: Option, index: number) => () => {
        onChange(option)
        setFocusedOptionIndex(index)
        !optionsLikeRightLabel && setInputText(option.text)
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
                if (!optionsLikeRightLabel) {
                    setInputText(options[focusedOptionIndex].text)
                }
                setOpenedOptions(!openedOptions)
                onChange(options[focusedOptionIndex])
                break
        }
    }

    const nativeSelectOption = (event: React.FormEvent<HTMLSelectElement>) => {
        const option = options.find((option) => option.value === event.currentTarget.value)

        if (option) {
            handleChangeOption(option, -1)
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
            {selectedOption.text}
            <ChevronDownSvg width={12} />
        </div>
    )

    const getDropdownContent = () =>
        width > 600 ? (
            <Dropdown
                className={classNames({ [styles.rightMode]: optionsLikeRightLabel })}
                active={openedOptions}
                position="bottom"
                widthAuto={view === 'text'}
                {...dropdownProps}
            >
                {filteredOptions.length !== 0
                    ? filteredOptions.map((option, index) => (
                          <div
                              key={option.value}
                              className={classNames({
                                  [styles.optionItem]: true,
                                  [styles.selectedOption]: selectedOption.value === option.value,
                                  [styles.focused]: focusedOptionIndex === index,
                              })}
                              onMouseDown={handleChangeOption(option, index)}
                          >
                              {option.prefix && <div className={styles.optionPrefix}>{option.prefix}</div>}
                              <span style={{ flex: 1 }}>{option.text}</span>
                              {option.suffix && <span className={styles.optionSuffix}>{option.suffix}</span>}
                              {selectedOption.value === option.value && <CheckMarkSvg width={12} />}
                          </div>
                      ))
                    : 'Items not found'}
            </Dropdown>
        ) : (
            <select onChange={nativeSelectOption} defaultValue={selectedOption.value} className={styles.nativeSelect}>
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
                {view !== 'text' && <div className={styles.suffixText}>{selectedOption.suffix}</div>}
                <ChevronDownSvg
                    className={classNames({
                        [styles.chevron]: true,
                        [styles.opened]: openedOptions,
                    })}
                    width={12}
                />
            </>
        )

    return (
        <TextInput
            onFocus={handleFocus}
            onBlur={hideOptions}
            onChange={handleChangeInputText}
            onKeyDown={handleKeyDown}
            onMouseDown={handleMouseDown}
            dropdownContent={getDropdownContent()}
            prefix={selectedOption.prefix}
            rightLabel={optionsLikeRightLabel && getRightLabel()}
            suffix={getSuffix()}
            disableTyping={!withSearch && !optionsLikeRightLabel && !withTyping}
            view={view}
            value={inputText}
            innerContainerRef={inputRef}
            textInputStyles={{
                ...textInputStyles,
                width: view === 'text' && `calc(${(inputText?.length || 0) + 1.5}ch`,
            }}
            {...rest}
        />
    )
}

const useOutsideClick = (ref: RefObject<HTMLDivElement | undefined>, callback: () => void) => {
    function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as any)) {
            callback()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return function cleanup() {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])
}

export default SelectInput
