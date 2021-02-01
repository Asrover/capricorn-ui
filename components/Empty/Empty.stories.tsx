import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Empty } from './index'

export default {
    title: 'Components/Empty',
    component: Empty,
} as Meta

export const All: React.FC = () => (
    <>
        <Empty />
    </>
)
