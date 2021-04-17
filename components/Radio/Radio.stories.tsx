import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Radio, { RadioGroup } from './index'
import Space from '../Space'

export default {
    title: 'Components/RadioGroup',
    component: RadioGroup,
} as Meta

export const All: React.FC = () => {
    const [group, setGroup] = useState(1)
    const [group2, setGroup2] = useState()
    const [group3, setGroup3] = useState()

    return (
        <Space column>
            <Radio.Group name="radio-group-name" label="Radio group with a label" onChange={setGroup} value={group}>
                <Radio value={1}>Default value: The first option</Radio>
                <Radio value={2}>The second option</Radio>
                <Radio value={3}>The third option</Radio>
                <Radio disabled value={4}>
                    Disabled
                </Radio>
            </Radio.Group>
            <Radio.Group
                name="radio-group-name-2"
                error={!group2 && 'Please choose at least one option'}
                label="Radio group with an error"
                onChange={setGroup2}
                value={group2}
            >
                <Radio value={1}>The first option</Radio>
                <Radio value={2}>The second option</Radio>
                <Radio value={3}>The third option</Radio>
                <Radio disabled value={4}>
                    Disabled
                </Radio>
            </Radio.Group>
            <Radio.Group
                error={!group3 && 'Please choose at least one option'}
                name="radio-group-name-3"
                vertical
                label="Vertical mode"
                onChange={setGroup3}
                value={group3}
            >
                <Radio value={1}>The first option</Radio>
                <Radio value={2}>The second option</Radio>
                <Radio value={3}>The third option</Radio>
                <Radio disabled value={4}>
                    Disabled
                </Radio>
            </Radio.Group>
        </Space>
    )
}
