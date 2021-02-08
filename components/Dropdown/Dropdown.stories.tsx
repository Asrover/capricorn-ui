import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Dropdown from './index'

export default {
    title: 'Components/Dropdown',
    component: Dropdown,
} as Meta

export const All: React.FC = () => {
    const [active, setActive] = useState(false)
    const [active2, setActive2] = useState(false)

    return (
        <>
            <span style={{ position: 'relative' }}>
                <span onMouseOver={() => setActive(true)} onMouseLeave={() => setActive(false)}>
                    Hover me Right
                </span>
                <Dropdown active={active}>Right text</Dropdown>
            </span>
            <br />
            <br />
            <span style={{ position: 'relative' }}>
                <span onMouseOver={() => setActive2(true)} onMouseLeave={() => setActive2(false)}>
                    Hover me Bottom
                </span>
                <Dropdown active={active2} position="bottom">
                    Bottom text
                </Dropdown>
            </span>
        </>
    )
}
