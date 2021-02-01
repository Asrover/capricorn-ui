import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Link } from './index'

export default {
    title: 'Components/Link',
    component: Link,
} as Meta

export const All: React.FC = () => (
    <>
        Lorem ipsum dolor <Link href="#">defaul link</Link>, consectetur adipisicing elit. Architecto asperiores aut
        culpa, cupiditate eos impedit iste maiores modi pariatur placeat quis quod repellat suscipit tempora temporibus
        vel veniam voluptatibus voluptatum.{' '}
        <Link href="#" hoverUnderline>
            Hover underline link
        </Link>{' '}
        lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, est inventore molestias nisi odio quibusdam.
        Incidunt magni mollitia perspiciatis ut vitae. Assumenda cum enim exercitationem. Alias cum illo magnam sint!
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad alias aliquid consequuntur{' '}
        <Link href="#" bold>
            bold link
        </Link>{' '}
        cumque delectus ea eum excepturi harum hic impedit, iusto molestias numquam possimus provident quidem quisquam,
        sequi totam?{' '}
        <Link href="#" disabled>
            Disabled link
        </Link>{' '}
        lorem
    </>
)
