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

const newOptions = [
    { value: 'new-eur', text: 'NEWEUR' },
    { value: 'new-usd', text: 'NEWUSD' },
    { value: 'new-gbp', text: 'NEWGBP' },
    { value: 'new-btc', text: 'NEWBTC' },
    { value: 'new-eth', text: 'NEWETH' },
    { value: 'new-usdt', text: 'NEWUSDT' },
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
    const [value2, setValue2] = useState(options[0])
    const [value3, setValue3] = useState()
    const [value8, setValue8] = useState(options[0])
    const [value9, setValue9] = useState(options[1])
    const [value10, setValue10] = useState(options[1])

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
    
    console.log('--- value8', value8)
    
    return (
        <Space column>
            <Surface>
                <Title level={2}>Extends: TextInput, Dropdown</Title>
            </Surface>
            {/*<SelectInput*/}
            {/*    selectedOption={value}*/}
            {/*    options={asyncOptions}*/}
            {/*    loading={loading}*/}
            {/*    autoSelect*/}
            {/*    onChange={setValue}*/}
            {/*    label="Async options and autoSelect"*/}
            {/*    fieldTip={`Value: ${value?.value}`}*/}
            {/*/>*/}
            {/*<SelectInput*/}
            {/*    selectedOption={value2}*/}
            {/*    options={options}*/}
            {/*    onChange={setValue2}*/}
            {/*    onChangeInputText={setValue3}*/}
            {/*    optionsLikeRightLabel*/}
            {/*    label="Options like right label"*/}
            {/*    fieldTip={`Value: ${value3} ${value2?.value}`}*/}
            {/*/>*/}
            <SelectInput
                selectedOption={value8}
                options={updOptions}
                onChange={setValue8}
                withSearch
                label="Options will update"
                dropdownProps={{ maxHeight: 300 }}
                fieldTip="Value will reset in three seconds, 'cause options will change"
                success="success"
            />
            {/*<SelectInput*/}
            {/*    name="nameselect"*/}
            {/*    selectedOption={value9}*/}
            {/*    options={options}*/}
            {/*    onChange={setValue9}*/}
            {/*    withSearch*/}
            {/*    label="Default value"*/}
            {/*    error="Some error"*/}
            {/*/>*/}
            {/*<div>*/}
            {/*    <SelectInput*/}
            {/*        selectedOption={value10}*/}
            {/*        options={options}*/}
            {/*        onChange={setValue10}*/}
            {/*        textInputValue={value10?.text}*/}
            {/*        view="text"*/}
            {/*        textInputStyles={textViewInputStyles}*/}
            {/*    />*/}
            {/*</div>*/}
        </Space>
    )
}
