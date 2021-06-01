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

    return (
        <>
            <Title level={2}>Extends: TextInput, Dropdown</Title>
            <Space column>
                <DateInput
                    name="date"
                    label="Дата"
                    value={value}
                    onChange={setValue}
                    fieldTip={`Value: ${value?.toLocaleDateString()}`}
                />
                <DateInput
                    label="Диапазон дат"
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
