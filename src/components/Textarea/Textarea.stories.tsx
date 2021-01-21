import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Textarea } from './index'

export default {
    title: 'Components/Textarea',
    component: Textarea,
} as Meta

export const All: React.FC = () => {
    const [value, setValue] = useState()
    const [value2, setValue2] = useState()
    const [value3, setValue3] = useState()
    const [value4, setValue4] = useState()

    return (
        <>
            <Textarea label="Comment" value={value} onChange={setValue} />
            <Textarea label="Error state" error="Reqired field" value={value3} onChange={setValue3} />
            <Textarea label="Success state" success="Success text" value={value4} onChange={setValue4} />
            <Textarea label="Adaptive height" error="Reqired field" adaptiveHeight value={value2} onChange={setValue2} />
        </>
    )
}
