import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { SelectInput } from './index'
import { Title } from '../Title'

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
    { value: 'usd', text: 'USD5849023', prefix: <Currency>$</Currency>, suffix: '55 USD' },
    { value: 'eur', text: 'EUR5849055', prefix: <Currency>€</Currency>, suffix: '70 EUR' },
    { value: 'gbp', text: 'GBP9865989', prefix: <Currency>£</Currency>, suffix: '1.45 GBP' },
]

export const All: React.FC = () => {
    const [currency, setCurrency] = useState(typeLabelOptions[0])
    const [value6, setValue6] = useState()
    const [value8, setValue8] = useState()
    const [value9, setValue9] = useState()

    return (
        <>
            <Title level={2}>Extends: TextInput</Title>
            <SelectInput selectedOption={value9} options={options} onChange={setValue9} label="Account" />
            <SelectInput
                type="money"
                selectedOption={currency}
                options={typeLabelOptions}
                onChange={setCurrency}
                onSearch={setValue6}
                optionsLikeRightLabel
                noMarginBottom
                label="Amount and currency"
            />
            Amount: {value6}
            Currency: {currency?.text}
            <br />
            <br />
            <SelectInput
                selectedOption={value8}
                options={options}
                onChange={setValue8}
                withSearch
                clearable
                label="Search"
            />
            <br />
            <br />
            <br />
            <br />
            <br />
        </>
    )
}
