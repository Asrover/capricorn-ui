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

const typeLabelOptions = [
    { value: 'usd', text: 'USD' },
    { value: 'eur', text: 'EUR' },
    { value: 'btc', text: 'BTC' },
    { value: 'rub', text: 'RUB' },
    { value: 'one', text: 'TWO' },
    { value: 'three', text: 'THREE' },
]

const viewTextOptions = [
    { value: 'usd', text: 'USD' },
    { value: 'usdt', text: 'USDT' },
    { value: 'eur', text: 'EUR' },
    { value: 'btc', text: 'BTC' },
    { value: 'rub', text: 'RUB' },
]

const Currency: React.FC = ({ children }) => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 18,
            width: 32,
            height: 32,
            borderRadius: 24,
            background: 'var(--color-primary)',
            color: '#fff',
        }}
    >
        {children}
    </div>
)

const options = [
    {
        value: 'usd',
        text: 'USD5849023',
        prefix: <Currency>$</Currency>,
        suffix: (
            <>
                <b>55</b>,00 USD
            </>
        ),
    },
    {
        value: 'eur',
        text: 'EUR5849055',
        prefix: <Currency>€</Currency>,
        suffix: (
            <>
                <b>70</b>,00 EUR
            </>
        ),
    },
    {
        value: 'gbp',
        text: 'GBP9865989',
        prefix: <Currency>£</Currency>,
        suffix: (
            <>
                <b>1.45</b>,00 GBP
            </>
        ),
    },
]

export const All: React.FC = () => {
    const [currency, setCurrency] = useState(typeLabelOptions[0])
    const [value6, setValue6] = useState()
    const [value8, setValue8] = useState()
    const [value9, setValue9] = useState()
    const [value10, setValue10] = useState()

    const [asyncOptions, setAsyncOptions] = useState([])
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState()

    useEffect(() => {
        setTimeout(() => {
            setAsyncOptions(options)
            setLoading(false)
        }, 3000)
    }, [])

    const textViewInputStyles = useMemo(
        () => ({
            caretColor: 'transparent',
            fontSize: 20,
        }),
        [],
    )

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
                label="Async options"
                suffixBaselineInputText
                textInputStyles={{ fontWeight: 600 }}
            />
            <SelectInput selectedOption={value9} options={options} onChange={setValue9} label="Account" />
            <SelectInput
                type="money"
                selectedOption={currency}
                options={typeLabelOptions}
                onChange={setCurrency}
                onSearch={setValue6}
                optionsLikeRightLabel
                noMarginBottom
                textInputValue="3000"
                label="Amount and currency"
                fieldTip={`Amount: ${value6} Currency: ${currency?.text}`}
            />
            <SelectInput selectedOption={value8} options={options} onChange={setValue8} withSearch label="Search" />
            <SelectInput
                selectedOption={value10}
                options={viewTextOptions}
                onChange={setValue10}
                value={value10?.text || 'Choose a currency'}
                view="text"
                textInputStyles={textViewInputStyles}
                loading={true}
            />
            <SelectInput
                selectedOption={value10}
                options={viewTextOptions}
                onChange={setValue10}
                defaultInputValue={'Choose a currency'}
                value={value10?.text}
                view="text"
                textInputStyles={textViewInputStyles}
            />
        </Space>
    )
}
