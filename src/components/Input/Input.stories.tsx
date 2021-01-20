import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Input } from './index'
import PrintSvg from '../../../assets/print.svg'

export default {
    title: 'Components/Input',
    component: Input,
} as Meta

const typeLabelOptions = [
    { value: 'usd', text: 'USD' },
    { value: 'eur', text: 'EUR' },
    { value: 'btc', text: 'BTC' },
    { value: 'rub', text: 'RUB' },
]

const options = [
    { value: 'usd', text: 'USD5849023 / 55 USD', leftContent: '$' },
    { value: 'eur', text: 'EUR5849055 / 70 EUR', leftContent: '€' },
    { value: 'gbp', text: 'GBP9865989 / 1.45 GBP', leftContent: '£' },
]

export const All: React.FC = () => {
    const [password, setPassword] = useState()
    const [search, setSearch] = useState()
    const [code, setCode] = useState()
    const [code2, setCode2] = useState()
    const [currency, setCurrency] = useState(typeLabelOptions[0])
    const [value1, setValue1] = useState()
    const [value2, setValue2] = useState()
    const [value3, setValue3] = useState()
    const [value4, setValue4] = useState()
    const [value6, setValue6] = useState()
    const [value8, setValue8] = useState()
    const [value9, setValue9] = useState()

    return (
        <>
            <Input type="password" label="Password with autoFocus" autoFocus onChange={setPassword} value={password} />
            <Input
                type="search"
                fullWidth
                label="Full with clearable search"
                clearable
                value={search}
                onChange={setSearch}
            />
            <Input
                value={value1}
                onChange={setValue1}
                label="With error"
                fieldTip="Field tip text"
                error="Required field"
            />
            <Input value={value2} onChange={setValue2} label="With success" success="Success text" />
            <Input disabled value={'Some text'} label="Disabled state" />
            <Input
                value={value3}
                onChange={setValue3}
                label="I am the static label"
                staticLabel
                placeholder="With placeholder, staticLabel and fieldTip"
                fieldTip="Please, fill this field"
            />
            <Input
                value={value4}
                onChange={setValue4}
                leftContent={<PrintSvg width={24} />}
                maxWidth={600}
                rightContent="Right Content"
                rightLabel="Right Label"
                label="With leftContent and custom maxWidth"
            />
            <Input
                type="money"
                value={value6}
                onChange={setValue6}
                selectedOption={currency}
                onChangeOptionValue={setCurrency}
                options={typeLabelOptions}
                optionsLikeRightLabel
                rightLabel="asd"
                label="Amount with optionsLikeRightLabel"
            />
            <Input
                type="code"
                codeLength={6}
                value={code}
                onChange={setCode}
                label="SMS code - 6 symbols"
                fieldTip="We send the code on +7900***2323"
            />
            <Input
                type="code"
                codeLength={4}
                value={code2}
                onChange={setCode2}
                label="SMS code - 4 symbols"
                fieldTip="We send the code on +7900***2323"
            />
            {/*<Input value={value7} onChange={setValue7} loading label="Loading state" />*/}
            <Input
                selectedOption={value8}
                options={typeLabelOptions}
                loading
                withSearch
                leftContent="leftContent"
                onChangeOptionValue={setValue8}
                label="With options"
            />
            <Input selectedOption={value9} leftContent={value9?.leftContent} options={options} onChangeOptionValue={setValue9} label="Account" />
        </>
    )
}
