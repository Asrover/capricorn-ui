import React, { useEffect, useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import SelectInput from './index'
import Title from '../Title'
import Surface from '../Surface'
import Space from '../Space'
import Button from '../Button'

export default {
    title: 'Components/SelectInput',
    component: SelectInput,
} as Meta

const options = [
    { value: 'eur', text: 'EUR', suffix: <span>suffix</span> },
    { value: 'usd', text: 'USD', suffix: 'suffix' },
    { value: 'gbp', text: 'GBP', suffix: 'suffix' },
    { value: 'btc', text: 'BTC', suffix: 'suffix' },
    { value: 'eth', text: 'ETH', suffix: 'suffix' },
    { value: 'usdt', text: 'USDT', suffix: 'suffix' },
]

const newOptions = [
    { value: 'new-eur', text: 'NEWEUR', suffix: 'suffix' },
    { value: 'new-usd', text: 'NEWUSD', suffix: 'suffix' },
    { value: 'new-gbp', text: 'NEWGBP', suffix: 'suffix' },
    { value: 'new-btc', text: 'NEWBTC', suffix: 'suffix' },
    { value: 'new-eth', text: 'NEWETH', suffix: 'suffix' },
    { value: 'new-usdt', text: 'NEWUSDT', suffix: 'suffix' },
]

const countries = [
    {
        value: 'Algeria',
        text: 'Algeria',
        countryCode: 'DZ',
    },
    {
        value: 'Andorra',
        text: 'Andorra',
        countryCode: 'AD',
    },
    {
        value: 'Long long name of country with multiple lines',
        text: 'Long long name of country with multiple lines with multiple lines',
        countryCode: 'AO',
    },
    {
        value: 'Argentina',
        text: 'Argentina',
        countryCode: 'AR',
    },
    {
        value: 'Armenia',
        text: 'Armenia',
        countryCode: 'AM',
    },
    {
        value: 'Australia',
        text: 'Australia',
        countryCode: 'AU',
    },
]

const textViewInputStyles = {
    fontWeight: 'bold',
    fontSize: 26,
    caretColor: 'transparent',
    borderRadius: '0',
    borderBottom: '1px solid #000',
}

export const All: React.FC = () => {
    const [asyncOptions, setAsyncOptions] = useState([])
    const [loading, setLoading] = useState(true)
    const [multiValue, setMultiValue] = useState([])
    const [value, setValue] = useState()
    const [value2, setValue2] = useState(options[0])
    const [value3, setValue3] = useState()
    const [value8, setValue8] = useState(options[0])
    const [value9, setValue9] = useState(options[1].value)
    const [value10, setValue10] = useState(options[1])
    const [value11, setValue11] = useState()

    const [updOptions, setUpdOptions] = useState(options)

    useEffect(() => {
        setTimeout(() => {
            setAsyncOptions(options)
            setLoading(false)
        }, 3000)

        setTimeout(() => {
            setUpdOptions(newOptions)
        }, 3000)
    }, [])

    return (
        <Space column>
            <Surface>
                <Title level={2}>Extends: TextInput, Dropdown</Title>
            </Surface>
            <SelectInput
                value={value11}
                options={countries}
                withSearch
                onChange={setValue11}
                label="Search"
            />
            <SelectInput
                value={multiValue}
                options={countries}
                multiple
                withSearch
                onChange={setMultiValue}
                label="Multiple mode"
            />
            <SelectInput
                value={value}
                options={asyncOptions}
                loading={loading}
                autoSelect
                onChange={setValue}
                label="Async options and autoSelect"
                fieldTip={`Value: ${value?.value}`}
            />
            <SelectInput
                value={value2}
                options={options}
                onChange={setValue2}
                onChangeInputText={setValue3}
                optionsLikeRightLabel
                label="Options like right label"
                fieldTip={`Value: ${value3} ${value2?.value}`}
            />
            <SelectInput
                value={value9}
                options={options}
                onChange={setValue9}
                label="With returnOnlyOptionValue"
                returnOnlyOptionValue
                fieldTip={`value: ${value9}`}
            />
            <SelectInput
                value={value8}
                options={updOptions}
                onChange={setValue8}
                withSearch
                prefix="prefix"
                label="Options will update"
                dropdownProps={{ maxHeight: 300 }}
                fieldTip="Value will reset in three seconds, 'cause options will change"
            />
            <div>
                <Button onClick={() => setValue9()}>Clear option above</Button>
            </div>
            <div>
                <SelectInput
                    value={value10}
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
