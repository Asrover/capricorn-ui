import React, { useState } from 'react'
import TextInput, { TextInputProps } from '../TextInput'
import styles from './DateInput.css'
import Dropdown from '../Dropdown'
import CalendarSvg from '../../assets/calendar.svg'
import Calendar from 'react-calendar'

interface DateInputProps extends Omit<TextInputProps, 'onChange' | 'value'> {
    onChange: (value?: Date | Date[]) => void
    value?: Date | Date[]
    isRange?: boolean
}

const DateInput: React.FC<DateInputProps> = ({ value, isRange, onChange, ...rest }) => {
    // const width = useWindowSize().width
    const [dateText, setDateText] = useState<string | undefined>()
    const [openedCalendar, setOpenedOptions] = useState(false)

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
                    onChange(null)
                    setDateText(undefined)
                }
            } else if (!isValidDate(stringToDate(dateText))) {
                onChange(null)
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

                if (isValidDate(date1) || isValidDate(date2)) {
                    const firstDate = value && (isValidDate(date1) ? date1 : value[0])
                    const secondDate = value && (isValidDate(date2) ? date2 : value[1])
                    onChange([firstDate, secondDate])
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
    }

    const getDropdownContent = () => (
        <Dropdown className={styles.dropDownContent} active={openedCalendar} position="bottom" autoMaxHeight noPadding>
            <Calendar selectRange={isRange} onChange={handleChangeDate} value={value} />
        </Dropdown>
    )
    // width > 600 ? (
    //     <Dropdown active={openedCalendar} position="bottom" autoMaxHeight noPadding>
    //         <Calendar selectRange={isRange} onChange={handleChangeDate} value={value} />
    //     </Dropdown>
    // ) : (
    //     <input type="date" value={value} />
    // )

    return (
        <TextInput
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChangeInputText}
            dropdownContent={getDropdownContent()}
            prefix={<CalendarSvg width={20} />}
            value={dateText}
            mask={isRange ? '00.00.0000 - 00.00.0000' : '00.00.0000'}
            clearable
            {...rest}
        />
    )
}

const dateDelimiter = ' - '

function isValidDate(d: any) {
    // @ts-ignore
    return d instanceof Date && !isNaN(d)
}

function stringToDate(s: string) {
    // format to YYYY/MM/DD
    return new Date(s.split('.').reverse().join('/'))
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
