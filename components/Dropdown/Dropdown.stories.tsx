import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Dropdown from './index'
import Space from '../Space'

export default {
    title: 'Components/Dropdown',
    component: Dropdown,
} as Meta

export const All: React.FC = () => {
    const [active, setActive] = useState(false)
    const [active2, setActive2] = useState(false)
    const [active3, setActive3] = useState(false)

    return (
        <Space align="flex-start" column>
            <span style={{ position: 'relative' }}>
                <span onMouseOver={() => setActive(true)} onMouseLeave={() => setActive(false)}>
                    Hover me Right
                </span>
                <Dropdown active={active}>Right text</Dropdown>
            </span>
            <span style={{ position: 'relative' }}>
                <span onMouseOver={() => setActive2(true)} onMouseLeave={() => setActive2(false)}>
                    Hover me Bottom
                </span>
                <Dropdown active={active2} position="bottom">
                    Bottom text
                </Dropdown>
            </span>
            <span style={{ position: 'relative' }}>
                <span onMouseOver={() => setActive3(true)} onMouseLeave={() => setActive3(false)}>
                    Hover me Top
                </span>
                <Dropdown toggleFullScreenWhenMobile active={active3} position="top">
                    top text
                </Dropdown>
            </span>
        </Space>
    )
}
