import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Checkbox } from './index'
import styles from '../../storybook.css'

export default {
    title: 'Components/Checkbox',
    component: Checkbox,
} as Meta

export const All: React.FC = () => {
    const [state, setState] = useState(false)
    const [state2, setState2] = useState(true)
    const [state3, setState3] = useState(false)

    return (
        <div className={styles.marginBetweenAll}>
            <Checkbox checked={state} onChange={setState}>
                Check it
            </Checkbox>
            <Checkbox checked={state2} onChange={setState2}>
                Uncheck it
            </Checkbox>
            <Checkbox checked={state3} onChange={setState3} error={!state3 && 'Required field'}>
                With error
            </Checkbox>
            <Checkbox checked onChange={() => {}} disabled>
                Disabled and checked
            </Checkbox>
            <Checkbox checked={false} onChange={() => {}} disabled>
                Disabled and unchecked
            </Checkbox>
        </div>
    )
}
