import React, { ReactElement } from 'react'
import { countryCodes } from '../../../constants/countryPhoneCodes'
import { TextInput, TextInputProps } from '../TextInput'

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
    const code1 = `+${code[0]}`
    const code2 = code1 + code[1]
    const code3 = code2 + code[2]

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

const Index: React.FC<TextInputProps> = ({ value, ...rest }) => {
    const found = findByPhoneCode(value || '')

    const findByLogin = (): ReactElement | null =>
        found ? React.createElement(found[1].icon, { width: 32 }) : undefined

    const mask = found ? `${found[0].replace(/[0-8]/g, '0')} 000 000 00 000` : '+000000000000000'

    return <TextInput {...rest} type="tel" value={value} prefix={findByLogin()} mask={mask} />
}

export const PhoneInput = Index
