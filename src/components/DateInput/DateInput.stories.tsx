import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { DateInput } from './index'
import { Title } from '../Title'

export default {
    title: 'Components/DateInput',
    component: DateInput,
} as Meta

export const All: React.FC = () => {
    const [value, setValue] = useState()

    return (
        <>
            <Title level={2}>Extends: TextInput</Title>
            <DateInput label="Дата" value={value} onChange={setValue} mask="00/00/0000" />
        </>
    )
}
