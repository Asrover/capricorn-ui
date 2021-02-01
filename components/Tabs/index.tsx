import * as React from 'react'
import InternalTabs, { TabsProps } from './Tabs'
import { TabItem } from './Item'

interface CompoundedComponent extends React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>> {
    Item: typeof TabItem
}

const Tabs = InternalTabs as CompoundedComponent
Tabs.Item = TabItem
export { TabItem }
export default Tabs
