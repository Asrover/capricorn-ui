import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { PhoneInput } from './index'
import { Title } from '../Title'

export default {
    title: 'Components/PhoneInput',
    component: PhoneInput,
} as Meta

export const All: React.FC = () => {
    const [value, setValue] = useState()

    return (
        <>
            <Title level={2}>Extends: TextInput</Title>
            <PhoneInput label="Номер телефона" value={value} onChange={setValue} />
        </>
    )
}
