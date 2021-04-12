import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Toast from './index'

export default {
    title: 'Components/Toast',
    component: Toast,
} as Meta

export const All: React.FC = () => (
    <>
        <Toast title="Success without message" skin="success" />
        <Toast title="Something went wrong" message="Some message" />
        <Toast title="Something went well" skin="success" message="Some message" />
        <Toast
            title="Some message"
            skin="message"
            message={
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet consequatur delectus distinctio dolores esse harum id illo ipsum nam neque nihil perferendis placeat, repellat reprehenderit sunt tempora tempore veritatis?'
            }
            actionText="Read"
            onActionClick={() => {}}
            dismissText="Close"
            onDismissClick={() => {}}
        />
    </>
)
