import React, { useEffect, useRef, useState } from 'react'
import Calendar from 'react-calendar'
import TextInput, { TextInputProps } from '../TextInput'
import styles from './DateInput.css'
import Dropdown, { DropdownProps } from '../Dropdown'
import CalendarSvg from '../../assets/calendar.svg'
import { useWindowSize } from 'react-use/esm'
import classNames from 'classnames'
import IMask from 'imask/esm'

export interface DateInputProps extends Omit<TextInputProps, 'onChange' | 'value' | 'mask' | 'pattern' | 'blocks'> {
    onChange: (value?: Date | Date[]) => void
    value?: Date | Date[]
    isRange?: boolean
    dropdownProps?: DropdownProps
}

const DateInput: React.FC<DateInputProps> = ({ value, isRange, onChange, dropdownProps, ...rest }) => {
    const width = useWindowSize().width
    const [dateText, setDateText] = useState<string | undefined>(dateToText(value, isRange))
    const [openedCalendar, setOpenedOptions] = useState(false)
    const nativeView = !isRange && width < 600
    const maskRef = useRef<IMask>()

    useEffect(() => {
        setDateText(dateToText(value, isRange))
    }, [value, isRange])

    const handleFocus = () => {
        setOpenedOptions(true)
    }

    const handleBlur = () => {
        setOpenedOptions(false)

        if (Boolean(dateText)) {
            if (isRange) {
                const [value1, value2] = dateText.split(dateDelimiter)
                const date1 = stringToDate(value1)
                const date2 = stringToDate(value2)

                if (!isValidDate(date1) || !isValidDate(date2)) {
                    maskRef.current.maskValue = ''
                    onChange(null)
                    setDateText(undefined)
                }
            } else if (!isValidDate(stringToDate(dateText))) {
                onChange(null)
                maskRef.current.maskValue = ''
                setDateText(undefined)
            }
        }
    }

    const handleChangeInputText = (textValue: string) => {
        if (textValue) {
            setDateText(textValue)

            if (!isRange) {
                const newDate = stringToDate(textValue)

                if (isValidDate(newDate)) {
                    onChange(newDate)
                }
            } else {
                const [value1, value2] = textValue.split(dateDelimiter)
                const date1 = value1 && stringToDate(value1)
                const date2 = value2 && stringToDate(value2)

                if (isValidDate(date1) && isValidDate(date2)) {
                    onChange([date1, date2])
                }
            }
        } else {
            setDateText(undefined)
            onChange(null)
        }
    }

    const handleChangeDate = (date) => {
        onChange(date)
        setDateText(dateToText(date, isRange))
        maskRef.current.maskValue = dateToText(date, isRange)
    }

    const selectNativeDate = (event: React.FormEvent<HTMLInputElement>) => {
        handleChangeDate(new Date(event.currentTarget.value))
    }

    const getDropdownContent = () =>
        nativeView ? (
            <input
                type="date"
                onChange={selectNativeDate}
                value={!Array.isArray(value) ? value?.toISOString().split('T')[0] : ''}
                className={classNames({
                    [styles.nativeDate]: true,
                })}
            />
        ) : (
            <Dropdown
                className={styles.dropDownContent}
                active={openedCalendar}
                position="bottom"
                maxHeight="auto"
                noPadding
                {...dropdownProps}
            >
                <Calendar selectRange={isRange} onChange={handleChangeDate} value={value} />
            </Dropdown>
        )

    return (
        <TextInput
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChangeInputText}
            dropdownContent={getDropdownContent()}
            prefix={<CalendarSvg width={20} />}
            value={dateText}
            maskRef={maskRef}
            mask={isRange ? 'from - to' : Date}
            blocks={
                isRange && {
                    from: {
                        mask: Date,
                    },
                    to: {
                        mask: Date,
                    },
                }
            }
            {...rest}
        />
    )
}

const dateDelimiter = ' - '

function isValidDate(d: any) {
    // @ts-ignore
    return d instanceof Date && !isNaN(d)
}

function stringToDate(s: string): Date | undefined {
    // format to YYYY/MM/DD
    const splitted = s?.split('.')

    // Check for full date
    if (splitted.length === 3 && splitted[2].length === 4) {
        return new Date(s.split('.').reverse().join('/'))
    }
}

function dateToText(date, isRange) {
    if (date) {
        if (isRange) {
            let range

            if (date[0]) {
                range = date[0].toLocaleDateString() || ''
            }

            if (date[1]) {
                const date2 = date[1].toLocaleDateString()
                range += date2 ? `${dateDelimiter}${date[1].toLocaleDateString()}` : ''
            }

            return range
        } else {
            return date.toLocaleDateString() || ''
        }
    }
}

export default DateInput
