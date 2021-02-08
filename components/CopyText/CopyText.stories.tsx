import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import CopyText from './index'

export default {
    title: 'Components/CopyText',
    component: CopyText,
} as Meta

export const All: React.FC = () => (
    <div>
        <>
            <CopyText>Default</CopyText>
            <CopyText highlightText>With highlight</CopyText>
            <CopyText bold>Bold label</CopyText>
            <CopyText noIcon>No icon</CopyText>
            <CopyText successCopiedText="Custom dropdown text">Custom dropdown text</CopyText>
            <CopyText textToCopy="123123123" successCopiedText="You copied 123123123">
                Custom text to copy
            </CopyText>
        </>
        <br />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. <CopyText>Default</CopyText> Adipisci animi atque,
        dignissimos dolorem <CopyText bold>bold label</CopyText> explicabo inventore ipsam laudantium nesciunt,{' '}
        <CopyText highlightText>With highlight</CopyText> nostrum, nulla officia porro quod sapiente!
    </div>
)
