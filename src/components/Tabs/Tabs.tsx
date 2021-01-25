import React, { ReactElement, useLayoutEffect, useMemo, useState } from 'react'
import styles from './Tabs.css'
import classNames from 'classnames'

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    children: React.ReactNode[]
    skin?: 'default' | 'button' | 'group-button' | 'steps' | 'divided-buttons'
    size?: 's' | 'm' | 'l'
    defaultActiveKey?: number
    onChange?: (id: string) => void
    headerSpaceBetween?: boolean
}

const InternalTabs: React.ForwardRefRenderFunction<HTMLElement, TabsProps> = ({
    size = 'm',
    skin = 'default',
    defaultActiveKey,
    onChange,
    headerSpaceBetween,
    children,
    ...rest
}) => {
    const [activeId, setActiveId] = useState(defaultActiveKey || children[0].props.id)
    const [tabIndicator, setTabIndicator] = useState({ offset: 0, width: 0 })

    const handleChangeActive = (id: string) => () => {
        setActiveId(id)
        onChange && onChange(id)
    }

    useLayoutEffect(() => {
        const activeTab = document.getElementsByClassName(tabsId)[0] as HTMLDivElement

        setTabIndicator({
            offset: activeTab?.offsetLeft,
            width: activeTab?.clientWidth,
        })
    }, [activeId])

    const activeTabContent = useMemo(() => children.find(({ props }: ReactElement) => props.id === activeId), [
        activeId,
    ])

    const tabsId = children[0].props.id

    return (
        <div
            {...rest}
            className={classNames({
                [styles.tabs]: true,
                [styles[`skin-${skin}`]]: true,
                [styles[`size-${size}`]]: true,
            })}
        >
            <div
                className={classNames({
                    [styles.tabHeader]: true,
                    [styles.headerSpaceBetween]: headerSpaceBetween,
                })}
            >
                {children.map(({ props }: ReactElement) => (
                    <div
                        key={props.id}
                        className={classNames({
                            [tabsId]: props.id === activeId,
                            [styles.tabHeaderItem]: true,
                            [styles.active]: props.id === activeId,
                        })}
                        onClick={handleChangeActive(props.id)}
                    >
                        {props.title}
                    </div>
                ))}
                {(skin === 'default' || skin === 'button' || skin === 'group-button') && tabIndicator && (
                    <div
                        className={styles.indicator}
                        style={{
                            transform: `translateX(${tabIndicator?.offset}px)`,
                            width: `${tabIndicator?.width}px`,
                        }}
                    />
                )}
            </div>
            <div
                className={classNames({
                    [styles.tabContent]: true,
                })}
            >
                {activeTabContent.props.children}
            </div>
        </div>
    )
}

export const Tabs = React.forwardRef<unknown, TabsProps>(InternalTabs)
export default Tabs
