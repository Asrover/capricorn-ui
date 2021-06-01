import React, { HTMLAttributes } from 'react'

export interface TabItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    title: React.ReactNode
    id: string
}

const Index: React.FC<TabItemProps> = () => null

export const TabItem = Index
