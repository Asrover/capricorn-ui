import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import PrintSvg from '../../../assets/print.svg'
import { Button } from './index'
import { Space } from '../Space'

export default {
    title: 'Components/Button',
    component: Button,
} as Meta

export const Action: React.FC = () => (
    <>
        <Space>
            <Button size="xl">Button</Button>
            <Button size="xl" disabled>
                Disabled
            </Button>
            <Button size="xl" loading>
                Loading
            </Button>
            <Button size="xl">
                <PrintSvg />
                Print
            </Button>
        </Space>
        <Space>
            <Button>Button</Button>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
            <Button>
                <PrintSvg />
                Print
            </Button>
        </Space>
        <Space>
            <Button size="m">Button</Button>
            <Button size="m" disabled>
                Disabled
            </Button>
            <Button size="m" loading>
                Loading
            </Button>
            <Button size="m">
                <PrintSvg />
                Print
            </Button>
        </Space>
        <Space>
            <Button size="s">Button</Button>
            <Button size="s" disabled>
                Disabled
            </Button>
            <Button size="s" loading>
                Loading
            </Button>
            <Button size="s">
                <PrintSvg />
                Print
            </Button>
        </Space>
    </>
)
export const Default: React.FC = () => (
    <>
        <Space>
            <Button size="xl" skin="default">
                Button
            </Button>
            <Button size="xl" skin="default" disabled>
                Disabled
            </Button>
            <Button size="xl" skin="default" loading>
                Loading
            </Button>
            <Button size="xl" skin="default">
                <PrintSvg />
                Print
            </Button>
        </Space>
        <Space>
            <Button skin="default">Button</Button>
            <Button skin="default" disabled>
                Disabled
            </Button>
            <Button skin="default" loading>
                Loading
            </Button>
            <Button skin="default">
                <PrintSvg />
                Print
            </Button>
        </Space>
        <Space>
            <Button size="m" skin="default">
                Button
            </Button>
            <Button size="m" skin="default" disabled>
                Disabled
            </Button>
            <Button size="m" skin="default" loading>
                Loading
            </Button>
            <Button size="m" skin="default">
                <PrintSvg />
                Print
            </Button>
        </Space>
        <Space>
            <Button size="s" skin="default">
                Button
            </Button>
            <Button size="s" skin="default" disabled>
                Disabled
            </Button>
            <Button size="s" skin="default" loading>
                Loading
            </Button>
            <Button size="s" skin="default">
                <PrintSvg />
                Print
            </Button>
        </Space>
    </>
)
export const Border: React.FC = () => (
    <>
        <Space>
            <Button size="xl" skin="border">
                Button
            </Button>
            <Button size="xl" skin="border" disabled>
                Disabled
            </Button>
            <Button size="xl" skin="border" loading>
                Loading
            </Button>
            <Button size="xl" skin="border">
                <PrintSvg />
                Print
            </Button>
        </Space>
        <Space>
            <Button skin="border">Button</Button>
            <Button skin="border" disabled>
                Disabled
            </Button>
            <Button skin="border" loading>
                Loading
            </Button>
            <Button skin="border">
                <PrintSvg />
                Print
            </Button>
        </Space>
        <Space>
            <Button size="m" skin="border">
                Button
            </Button>
            <Button size="m" skin="border" disabled>
                Disabled
            </Button>
            <Button size="m" skin="border" loading>
                Loading
            </Button>
            <Button size="m" skin="border">
                <PrintSvg />
                Print
            </Button>
        </Space>
        <Space>
            <Button size="s" skin="border">
                Button
            </Button>
            <Button size="s" skin="border" disabled>
                Disabled
            </Button>
            <Button size="s" skin="border" loading>
                Loading
            </Button>
            <Button size="s" skin="border">
                <PrintSvg />
                Print
            </Button>
        </Space>
    </>
)
export const Pseudo: React.FC = () => (
    <>
        <Space>
            <Button size="xl" skin="pseudo">
                Button
            </Button>
            <Button size="xl" skin="pseudo" disabled>
                Disabled
            </Button>
            <Button size="xl" skin="pseudo" loading>
                Loading
            </Button>
            <Button size="xl" skin="pseudo">
                <PrintSvg />
                Print
            </Button>
        </Space>
        <Space>
            <Button skin="pseudo">Button</Button>
            <Button skin="pseudo" disabled>
                Disabled
            </Button>
            <Button skin="pseudo" loading>
                Loading
            </Button>
            <Button skin="pseudo">
                <PrintSvg />
                Print
            </Button>
        </Space>
        <Space>
            <Button size="m" skin="pseudo">
                Button
            </Button>
            <Button size="m" skin="pseudo" disabled>
                Disabled
            </Button>
            <Button size="m" skin="pseudo" loading>
                Loading
            </Button>
            <Button size="m" skin="pseudo">
                <PrintSvg />
                Print
            </Button>
        </Space>
        <Space>
            <Button size="s" skin="pseudo">
                Button
            </Button>
            <Button size="s" skin="pseudo" disabled>
                Disabled
            </Button>
            <Button size="s" skin="pseudo" loading>
                Loading
            </Button>
            <Button size="s" skin="pseudo">
                <PrintSvg />
                Print
            </Button>
        </Space>
    </>
)
export const Back: React.FC = () => (
    <>
        <Space>
            <Button size="xl" skin="back">
                Back
            </Button>
            <Button size="xl" skin="back" disabled>
                Disabled
            </Button>
            <Button size="xl" skin="back" loading>
                Loading
            </Button>
        </Space>
        <Space>
            <Button skin="back">Back</Button>
            <Button skin="back" disabled>
                Disabled
            </Button>
            <Button skin="back" loading>
                Loading
            </Button>
        </Space>
        <Space>
            <Button size="m" skin="back">
                Back
            </Button>
            <Button size="m" skin="back" disabled>
                Disabled
            </Button>
            <Button size="m" skin="back" loading>
                Loading
            </Button>
        </Space>
        <Space>
            <Button size="s" skin="back">
                Back
            </Button>
            <Button size="s" skin="back" disabled>
                Disabled
            </Button>
            <Button size="s" skin="back" loading>
                Loading
            </Button>
        </Space>
    </>
)
export const Link: React.FC = () => (
    <>
        <Space>
            <Button size="xl" skin="link">
                Back
            </Button>
            <Button size="xl" skin="link" disabled>
                Disabled
            </Button>
            <Button size="xl" skin="link" loading>
                Loading
            </Button>
            <Button size="xl" skin="link">
                <PrintSvg />
                Print
            </Button>
        </Space>
        <Space>
            <Button skin="link">Back</Button>
            <Button skin="link" disabled>
                Disabled
            </Button>
            <Button skin="link" loading>
                Loading
            </Button>
            <Button skin="link">
                <PrintSvg />
                Print
            </Button>
        </Space>
        <Space>
            <Button size="m" skin="link">
                Back
            </Button>
            <Button size="m" skin="link" disabled>
                Disabled
            </Button>
            <Button size="m" skin="link" loading>
                Loading
            </Button>
            <Button size="m" skin="link">
                <PrintSvg />
                Print
            </Button>
        </Space>
        <Space>
            <Button size="s" skin="link">
                Back
            </Button>
            <Button size="s" skin="link" disabled>
                Disabled
            </Button>
            <Button size="s" skin="link" loading>
                Loading
            </Button>
            <Button size="s" skin="link">
                <PrintSvg />
                Print
            </Button>
        </Space>
    </>
)
