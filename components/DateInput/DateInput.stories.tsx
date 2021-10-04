import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import DateInput from './index'
import Title from '../Title'
import Space from '../Space'

export default {
    title: 'Components/DateInput',
    component: DateInput,
} as Meta

export const All: React.FC = () => {
    const [value, setValue] = useState<Date>(new Date())
    const [value2, setValue2] = useState<Date[]>()
    const [value3, setValue3] = useState<Date[]>()
    const [ISOvalue, setISOvalue] = useState<string>('10.10.2010')

    return (
        <>
            <Title level={2}>Extends: TextInput, Dropdown</Title>
            <Space column>
                <DateInput
                    label="With default date and EN locale"
                    value={value}
                    locale="EN"
                    onChange={setValue}
                    fieldTip={`Value: ${value?.toLocaleDateString()}`}
                />
                <DateInput
                    label="dateStringMode"
                    dateStringMode
                    value={ISOvalue}
                    onChange={setISOvalue}
                    fieldTip={`Value: ${ISOvalue}`}
                />
                <DateInput
                    label="Date with mask"
                    value={value3}
                    onChange={setValue3}
                    fieldTip={`Format: DD.MM.YYYY, Value: ${value3?.toLocaleDateString()}`}
                />
                <DateInput
                    label="Date range"
                    value={value2}
                    isRange
                    onChange={setValue2}
                    fieldTip={`Value1: ${value2 && value2[0]?.toLocaleDateString()} Value2: ${
                        value2 && value2[1]?.toLocaleDateString()
                    }`}
                />
            </Space>
        </>
    )
}
