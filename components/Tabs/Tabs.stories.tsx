import React, { useEffect, useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Tabs from './index'
import Title from '../Title'

export default {
    title: 'Components/Tabs',
    component: Tabs,
} as Meta

export const All: React.FC = () => {
    const [active, setActive] = useState(null)
    const [active3, setActive3] = useState(null)
    const [active2, setActive2] = useState('second1')
    const [title, setTitle] = useState('First')

    useEffect(() => {
        setTitle('Long title')
    }, [])

    return (
        <>
            <Title level={2}>(skin=default)</Title>
            <Tabs size="l" activeId={active3} onChange={setActive3}>
                <Tabs.Item title="First" id="first3">
                    Skin: Default, long tabs
                </Tabs.Item>
                <Tabs.Item title="Second" id="second3">
                    Skin: Default, long tabs
                </Tabs.Item>
            </Tabs>
            <br />
            <br />
            <Tabs size="l" stretchWidth activeId={active} onChange={setActive}>
                <Tabs.Item title="First" id="first2">
                    Skin: Default, stretchWidth: true
                </Tabs.Item>
                <Tabs.Item title="Second" id="second2">
                    Skin: Default, stretchWidth: true
                </Tabs.Item>
            </Tabs>
            <br />
            <br />
            <Title level={2}>Extends: Button (skin=button)</Title>
            <Tabs skin="button" size="l" headerSpaceBetween activeId={active2} onChange={setActive2}>
                <Tabs.Item title={title} id="first1">
                    Skin: Default, The first - Size l, defaultActiveId = Second
                </Tabs.Item>
                <Tabs.Item title="Second" id="second1">
                    Skin: Default, The second - Size l, defaultActiveId = Second
                </Tabs.Item>
                <Tabs.Item title="Third" id="third1">
                    Skin: Default, The second - Size l, defaultActiveId = Second
                </Tabs.Item>
            </Tabs>
            <br />
            <br />
            <Title level={2}>(skin=group-button)</Title>
            <Tabs skin="group-button" size="l" activeId={active} onChange={setActive}>
                <Tabs.Item title="First" id="first8">
                    Skin: group-button, The first - Size l
                </Tabs.Item>
                <Tabs.Item title="Second" id="second8">
                    Skin: group-button, The second - Size l
                </Tabs.Item>
                <Tabs.Item title="Third" id="third8">
                    Skin: group-button, The Third - Size l
                </Tabs.Item>
            </Tabs>
        </>
    )
}
