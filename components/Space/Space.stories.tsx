import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Space from './index'
import Surface from '../Surface'
import Title from '../Title'
import Button from '../Button'

export default {
    title: 'Components/Space',
    component: Space,
} as Meta

export const All: React.FC = () => (
    <>
        <Surface>
            <Title level={2}>Popular cases</Title>
            <Space size="l" justify="flex-end">
                <Button skin="border">Back</Button>
                <Button>Continue</Button>
            </Space>
        </Surface>
        <br />
        <Surface>
            <Title level={2}>Size: l</Title>
            <Space size="l" align="center">
                <div>I</div>
                <div>add</div>
                <div>space</div>
                <Button>Between</Button>
                <div>every</div>
                <div>element</div>
                <Button size="s">Inside</Button>
            </Space>
            <Space size="l" align="center" column>
                <div>add</div>
                <div>space</div>
                <div>between</div>
                <div>every</div>
                <div>element</div>
                <div>inside</div>
            </Space>
        </Surface>
        <br />
        <Surface>
            <Title level={2}>Size: m</Title>
            <Space>
                <div>I</div>
                <div>add</div>
                <div>space</div>
                <div>between</div>
                <div>every</div>
                <div>element</div>
                <div>inside</div>
            </Space>
            <Space column>
                <div>add</div>
                <div>space</div>
                <div>between</div>
                <div>every</div>
                <div>element</div>
                <div>inside</div>
            </Space>
        </Surface>
        <br />
        <Surface>
            <Title level={2}>Size: s</Title>
            <Space size="s">
                <div>I</div>
                <div>add</div>
                <div>space</div>
                <div>between</div>
                <div>every</div>
                <div>element</div>
                <div>inside</div>
            </Space>
            <Space size="s" column>
                <div>add</div>
                <div>space</div>
                <div>between</div>
                <div>every</div>
                <div>element</div>
                <div>inside</div>
            </Space>
        </Surface>
        <br />
        <Surface>
            <Title level={2}>Size: space-between</Title>
            <Space justify="space-between">
                <div>I</div>
                <div>add</div>
                <div>space</div>
                <div>between</div>
                <div>every</div>
                <div>element</div>
                <div>inside</div>
            </Space>
            <Space justify="space-between" column>
                <div>add</div>
                <div>space</div>
                <div>between</div>
                <div>every</div>
                <div>element</div>
                <div>inside</div>
            </Space>
        </Surface>
        <Surface>
            <Title level={2}>Custom size: 40px</Title>
            <Space size={40}>
                <div>I</div>
                <div>add</div>
                <div>40px</div>
                <div>between</div>
                <div>every</div>
                <div>element</div>
                <div>inside</div>
            </Space>
            <Space size={40} column>
                <div>add</div>
                <div>40px</div>
                <div>between</div>
                <div>every</div>
                <div>element</div>
                <div>inside</div>
            </Space>
        </Surface>
    </>
)
