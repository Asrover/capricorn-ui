import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Space } from './index'
import { Surface } from '../Surface'
import { Title } from '../Title'
import { Button } from '../Button'

export default {
    title: 'Components/Space',
    component: Space,
} as Meta

export const All: React.FC = () => (
    <>
        <Surface>
            <Title level={2}>Size: l</Title>
            <Space size="l" align="center">
                <span>I</span>
                <span>add</span>
                <span>space</span>
                <Button>Between</Button>
                <span>every</span>
                <span>element</span>
                <Button size="s">Inside</Button>
            </Space>
            <Space size="l" align="center" column>
                <span>add</span>
                <span>space</span>
                <span>between</span>
                <span>every</span>
                <span>element</span>
                <span>inside</span>
            </Space>
        </Surface>
        <br/>
        <Surface>
            <Title level={2}>Size: m</Title>
            <Space>
                <span>I</span>
                <span>add</span>
                <span>space</span>
                <span>between</span>
                <span>every</span>
                <span>element</span>
                <span>inside</span>
            </Space>
            <Space column>
                <span>add</span>
                <span>space</span>
                <span>between</span>
                <span>every</span>
                <span>element</span>
                <span>inside</span>
            </Space>
        </Surface>
        <br/>
        <Surface>
            <Title level={2}>Size: s</Title>
            <Space size="s">
                <span>I</span>
                <span>add</span>
                <span>space</span>
                <span>between</span>
                <span>every</span>
                <span>element</span>
                <span>inside</span>
            </Space>
            <Space size="s" column>
                <span>add</span>
                <span>space</span>
                <span>between</span>
                <span>every</span>
                <span>element</span>
                <span>inside</span>
            </Space>
        </Surface>
        <br/>
        <Surface>
            <Title level={2}>Size: space-between</Title>
            <Space size="space-between">
                <span>I</span>
                <span>add</span>
                <span>space</span>
                <span>between</span>
                <span>every</span>
                <span>element</span>
                <span>inside</span>
            </Space>
            <Space size="space-between" column>
                <span>add</span>
                <span>space</span>
                <span>between</span>
                <span>every</span>
                <span>element</span>
                <span>inside</span>
            </Space>
        </Surface>
    </>
)
