import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Space from './index'
import Surface from '../Surface'
import Title from '../Title'
import Button from '../Button'
import TextInput from '../TextInput'

export default {
    title: 'Components/Space',
    component: Space,
} as Meta

export const All: React.FC = () => (
    <>
        <Surface>
            <Title level={2}>Popular cases</Title>
            <Space column size={40}>
                <Space align="center" size={40}>
                    <TextInput value="" onChange={() => null} />
                    <TextInput value="" onChange={() => null} />
                    <div>Some text</div>
                </Space>
                <Space align="center" size={24}>
                    <TextInput value="" onChange={() => null} />
                    <TextInput value="" onChange={() => null} />
                    <div style={{ color: 'red' }}>Some text</div>
                </Space>
                <Space justify="flex-end">
                    <Button skin="border">Back</Button>
                    <Button>Continue</Button>
                </Space>
            </Space>
        </Surface>
    </>
)
