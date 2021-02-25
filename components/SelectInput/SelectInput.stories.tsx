import React, { useEffect, useMemo, useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import SelectInput from './index'
import Title from '../Title'
import Surface from '../Surface'
import Space from '../Space'

export default {
    title: 'Components/SelectInput',
    component: SelectInput,
} as Meta

const options = [
    { value: 'eur', text: 'EUR' },
    { value: 'usd', text: 'USD' },
    { value: 'gbp', text: 'GBP' },
    { value: 'btc', text: 'BTC' },
    { value: 'eth', text: 'ETH' },
    { value: 'usdt', text: 'USDT' },
]

const textViewInputStyles = {
    fontWeight: 'bold',
    fontSize: 26,
    caretColor: 'transparent',
}

export const All: React.FC = () => {
    const [asyncOptions, setAsyncOptions] = useState([])
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState()
    const [value8, setValue8] = useState()
    const [value9, setValue9] = useState(options[1])
    const [value10, setValue10] = useState(options[1])

    useEffect(() => {
        setTimeout(() => {
            setAsyncOptions(options)
            setLoading(false)
        }, 3000)
    }, [])

    return (
        <Space column size="l">
            <Surface>
                <Title level={2}>Extends: TextInput, Dropdown</Title>
            </Surface>
            <SelectInput
                selectedOption={value}
                options={asyncOptions}
                loading={loading}
                autoSelect
                onChange={setValue}
                label="Async options and autoSelect"
                fieldTip={`Value: ${value?.value}`}
            />
            <SelectInput selectedOption={value8} options={options} onChange={setValue8} withSearch label="Search" />
            <SelectInput
                name="nameselect"
                selectedOption={value9}
                options={options}
                onChange={setValue9}
                withSearch
                label="Default value"
            />
            <div>
                <SelectInput
                    selectedOption={value10}
                    options={options}
                    onChange={setValue10}
                    textInputValue={value10?.text}
                    view="text"
                    textInputStyles={textViewInputStyles}
                />
            </div>
        </Space>
    )
}

// Не работает смена inputText в селекте с другого инпута
