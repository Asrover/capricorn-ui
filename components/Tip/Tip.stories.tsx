import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Tip from './index'
import Space from '../Space'

export default {
    title: 'Components/Tip',
    component: Tip,
} as Meta

export const All: React.FC = () => (
    <Space column>
        <br />
        <br />
        <div>
            <Tip title="Hover mode" dropdownProps={{ minWidth: 400 }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, blanditiis consectetur consequatur
                cumque cupiditate distinctio dolorem eos eveniet exercitationem facere incidunt ipsum minima, nam nobis
                quibusdam quis rem sint, suscipit!
            </Tip>
        </div>
        <div>
            <Tip
                title="Click mode with position bottom"
                openingMode="click"
                dropdownProps={{ minWidth: 400, position: 'bottom' }}
            >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, blanditiis consectetur consequatur
                cumque cupiditate distinctio dolorem eos eveniet exercitationem facere incidunt ipsum minima, nam nobis
                quibusdam quis rem sint, suscipit!
            </Tip>
        </div>
    </Space>
)
