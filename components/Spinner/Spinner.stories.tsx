import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Spinner } from './index'
import { Space } from '../Space'

export default {
    title: 'Components/Spinner',
    component: Spinner,
} as Meta

export const All: React.FC = () => (
    <>
        <Space>
            <Spinner size="l" />
            <Spinner />
            <Spinner size="s" />
        </Space>
    </>
)
