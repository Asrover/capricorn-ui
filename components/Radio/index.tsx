import * as React from 'react'
import InternalRadio, { RadioProps } from './Radio'
import { RadioGroup } from './Group'

interface CompoundedComponent
    extends React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLInputElement>> {
    Group: typeof RadioGroup
}

const Radio = InternalRadio as CompoundedComponent
Radio.Group = RadioGroup
export { RadioGroup }
export default Radio
