import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Tabs from './index'
import Title from '../Title'

export default {
    title: 'Components/Tabs',
    component: Tabs,
} as Meta

export const All: React.FC = () => {
    const [active, setActive] = useState(null)
    const [active2, setActive2] = useState('second1')

    return (
        <>
            <Title level={2}>Extends: Button (skin=button)</Title>
            <Tabs size="l" headerSpaceBetween activeId={active2} onChange={setActive2}>
                <Tabs.Item title="First" id="first1">
                    Skin: Default, The first - Size l, headerSpaceBetween: true, defaultActiveId = Second
                </Tabs.Item>
                <Tabs.Item title="Second" id="second1">
                    Skin: Default, The second - Size l, headerSpaceBetween: true, defaultActiveId = Second
                </Tabs.Item>
                <Tabs.Item title="Third" id="third1">
                    Skin: Default, The second - Size l, headerSpaceBetween: true, defaultActiveId = Second
                </Tabs.Item>
            </Tabs>
            <br />
            <br />
            <Tabs noItemHorizontalSpace activeId={active} onChange={setActive}>
                <Tabs.Item title="First" id="first2">
                    Skin: Default, The first - Size m (default)
                </Tabs.Item>
                <Tabs.Item title="Second" id="second2">
                    Skin: Default, The second - Size m (default)
                </Tabs.Item>
            </Tabs>
            <br />
            <br />
            <Tabs size="s" activeId={active} onChange={setActive}>
                <Tabs.Item title="First" id="first3">
                    Skin: Default, The first - Size s
                </Tabs.Item>
                <Tabs.Item title="Second" id="second3">
                    Skin: Default, The second - Size s
                </Tabs.Item>
            </Tabs>
            <br />
            <br />
            <Tabs skin="button" size="l" activeId={active} onChange={setActive}>
                <Tabs.Item title="First" id="first4">
                    Skin: Button, The first - Size l
                </Tabs.Item>
                <Tabs.Item title="Second" id="second4">
                    Skin: Button, The second - Size l
                </Tabs.Item>
                <Tabs.Item title="Third" id="third4">
                    Skin: Button, The second - Size l
                </Tabs.Item>
            </Tabs>
            <br />
            <br />
            <Tabs skin="button" activeId={active} onChange={setActive}>
                <Tabs.Item title="First" id="first5">
                    Skin: Button, The first - Size m (default)
                </Tabs.Item>
                <Tabs.Item title="Second" id="second5">
                    Skin: Button, The second - Size m (default)
                </Tabs.Item>
            </Tabs>
            <br />
            <br />
            <Tabs skin="button" size="s" activeId={active} onChange={setActive}>
                <Tabs.Item title="First" id="first6">
                    Skin: Button, The first - Size s
                </Tabs.Item>
                <Tabs.Item title="Second" id="second6">
                    Skin: Button, The second - Size s
                </Tabs.Item>
            </Tabs>
            <br />
            <br />
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
            <br />
            <br />
            <Tabs skin="group-button" activeId={active} onChange={setActive}>
                <Tabs.Item title="First" id="first9">
                    Skin: group-button, The first - Size m
                </Tabs.Item>
                <Tabs.Item title="Second" id="second9">
                    Skin: group-button, The second - Size m
                </Tabs.Item>
                <Tabs.Item title="Third" id="third9">
                    Skin: group-button, The Third - Size m
                </Tabs.Item>
            </Tabs>
            <br />
            <br />
            <Tabs skin="group-button" size="s" activeId={active} onChange={setActive}>
                <Tabs.Item title="First" id="first7">
                    Skin: group-button, The first - Size s
                </Tabs.Item>
                <Tabs.Item title="Second" id="second7">
                    Skin: group-button, The second - Size s
                </Tabs.Item>
                <Tabs.Item title="Third" id="third7">
                    Skin: group-button, The Third - Size s
                </Tabs.Item>
            </Tabs>
        </>
    )
}
