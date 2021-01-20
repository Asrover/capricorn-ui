import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Input } from './index'
import PrintSvg from '../../../assets/print.svg'

export default {
    title: 'Components/Input',
    component: Input,
} as Meta

const options = [
    { value: 'usd', text: 'USD' },
    { value: 'eur', text: 'EUR' },
    { value: 'btc', text: 'BTC' },
]

export const All: React.FC = () => {
    const [password, setPassword] = useState()
    const [search, setSearch] = useState()
    const [code, setCode] = useState()
    const [code2, setCode2] = useState()
    const [currency, setCurrency] = useState(options[0])
    const [value1, setValue1] = useState()
    const [value2, setValue2] = useState()
    const [value3, setValue3] = useState()
    const [value4, setValue4] = useState()
    const [value5, setValue5] = useState()
    const [value6, setValue6] = useState()
    const [value7, setValue7] = useState('Some initial value')
    const [value8, setValue8] = useState()

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
                leftIcon={<PrintSvg width={24} />}
                maxWidth={600}
                label="With leftIcon and custom maxWidth"
            />
            <Input value={value5} onChange={setValue5} type="money" typeLabel="USD" label="Amount with typeLabel" />
            <Input
                value={value6}
                onChange={setValue6}
                type="money"
                typeLabel={currency.text}
                onChangeTypeLabel={setCurrency}
                typeLabelOptions={options}
                label="Amount with typeLabel options"
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
            <Input disabled value={'Some text'} label="Disabled state" />
            {/*<Input value={value7} onChange={setValue7} loading label="Loading state" />*/}
            <Input optionValue={value8} options={options} loading onChangeOption={setValue8} label="With options" />
        </>
    )
}
