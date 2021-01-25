import React from 'react'
import { TextInput, InputProps } from '../TextInput'

const Index: React.FC<InputProps> = ({ value, ...rest }) => {
    return <TextInput {...rest} value={value} />
}

export const DateInput = Index
