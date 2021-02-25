import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import TextInput from './index'
import PrintSvg from '../../assets/print.svg'
import Space from '../Space'

export default {
    title: 'Components/TextInput',
    component: TextInput,
} as Meta

const textViewInputStyles = {
    fontWeight: 600,
    fontSize: 22,
}

export const All: React.FC = () => {
    const [password, setPassword] = useState()
    const [code, setCode] = useState()
    const [code2, setCode2] = useState()
    const [value1, setValue1] = useState()
    const [value2, setValue2] = useState()
    const [value3, setValue3] = useState()
    const [value4, setValue4] = useState()
    const [value5, setValue5] = useState()

    return (
        <Space column size="l">
            <TextInput
                name="inputName"
                type="password"
                label="Password with autoFocus"
                autoFocus
                onChange={setPassword}
                value={password}
            />
            <TextInput
                value={value1}
                onChange={setValue1}
                label="With error"
                fieldTip="Field tip text"
                error="Required field"
            />
            <TextInput value={value2} onChange={setValue2} label="With success" success="Success text" />
            <TextInput disabled value={'Some text'} loading label="Disabled and loading state" />
            <TextInput
                value={value3}
                onChange={setValue3}
                label="I am the static label"
                staticLabel
                placeholder="With placeholder, staticLabel and fieldTip"
                fieldTip="Please, fill this field"
            />
            <TextInput
                value={value4}
                onChange={setValue4}
                prefix={<PrintSvg width={24} />}
                maxWidth={600}
                suffix="Suffix"
                rightLabel="Right Label"
                label="With prefix and custom maxWidth"
            />
            <TextInput
                value={value5}
                onChange={setValue5}
                label="Birth day with mask"
                mask="00.00.0000"
                fieldTip="Format: DD.MM.YYYY"
            />
            <TextInput
                type="code"
                codeLength={6}
                value={code}
                onChange={setCode}
                label="SMS code - 6 symbols"
                fieldTip="We send the code on +7900***2323"
            />
            <TextInput
                type="code"
                codeLength={4}
                value={code2}
                onChange={setCode2}
                label="SMS code - 4 symbols"
                fieldTip="We send the code on +7900***2323"
            />
            <TextInput
                view="underscore"
                type="money"
                fieldTip="View: underscore"
                autoFocus
                suffix="EUR"
                onChange={setPassword}
                value={password}
                textInputStyles={textViewInputStyles}
            />
        </Space>
    )
}
