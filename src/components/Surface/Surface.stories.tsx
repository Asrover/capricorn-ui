import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Surface } from './index'

export default {
    title: 'Components/Surface',
    component: Surface,
} as Meta

export const All: React.FC = () => (
    <>
        <Surface>I am the Surface</Surface>
        <br />
        <br />
        <Surface padding={0}>I am the Surface with padding = 0</Surface>
    </>
)
