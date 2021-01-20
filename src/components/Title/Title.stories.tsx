import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Title } from './index'

export default {
    title: 'Components/Title',
    component: Title,
} as Meta

export const All: React.FC = () => (
    <>
        <Title>h1. Capricorn UI</Title>
        <Title level={2}>h2. Capricorn UI</Title>
        <Title level={3}>h3. Capricorn UI</Title>
        <Title level={4}>h4. Capricorn UI</Title>
        <Title level={5}>h5. Capricorn UI</Title>
    </>
)
