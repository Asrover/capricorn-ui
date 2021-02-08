import React from 'react'
import { countryCodes } from '../../constants/countryPhoneCodes'
import TextInput, { TextInputProps } from '../TextInput'

const findByPhoneCode = (
    code: string,
):
    | [
          string,
          {
              name: string
              countryCode: string
              icon: string
              mask?: string
          },
      ]
    | null => {
    const code1 = `+${code[1]}`
    const code2 = code1 + code[2]
    const code3 = code2 + code[3]

    if (countryCodes[code3]) {
        return [code3, countryCodes[code3]]
    }
    if (countryCodes[code2]) {
        return [code2, countryCodes[code2]]
    }
    if (countryCodes[code1]) {
        return [code1, countryCodes[code1]]
    }
    return null
}

const PhoneInput: React.FC<TextInputProps> = ({ value, ...rest }) => {
    const found = findByPhoneCode(value || '')

    const findByLogin = () => (found ? React.createElement(found[1].icon, { width: 32 }) : undefined)

    return <TextInput {...rest} type="tel" value={value} prefix={findByLogin()} mask="+000000000000000" />
}

export default PhoneInput
