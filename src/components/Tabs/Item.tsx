import React, { ReactNode } from 'react'

export interface TabItemProps {
    title: React.ReactNode
    id: string
    children: ReactNode
}

const Index: React.FC<TabItemProps> = () => null

export const TabItem = React.memo(Index)
