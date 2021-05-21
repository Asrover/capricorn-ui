import React, { ReactElement, useLayoutEffect, useMemo, useState } from 'react'
import styles from './Tabs.css'
import classNames from 'classnames'
import Button from '../Button'

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    children: React.ReactElement[]
    skin?: 'default' | 'button' | 'group-button' | 'steps'
    size?: 's' | 'm' | 'l'
    defaultActiveKey?: number
    onChange?: (id: string) => void
    headerSpaceBetween?: boolean
    noItemHorizontalSpace?: boolean
}

const InternalTabs: React.ForwardRefRenderFunction<HTMLElement, TabsProps> = ({
    size = 'm',
    skin = 'default',
    defaultActiveKey,
    onChange,
    headerSpaceBetween,
    children,
    className,
    noItemHorizontalSpace,
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
            width: skin === 'group-button' ? activeTab?.clientWidth + 1 : activeTab?.clientWidth,
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
                [className]: Boolean(className),
                [styles.tabs]: true,
                [styles.noItemHorizontalSpace]: noItemHorizontalSpace,
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
                {children.map(({ props }: ReactElement, index) =>
                    skin === 'button' ? (
                        <Button
                            skin={props.id === activeId ? 'action' : 'default'}
                            key={props.id}
                            size={size}
                            onClick={handleChangeActive(props.id)}
                        >
                            {props.title}
                        </Button>
                    ) : (
                        <div
                            key={props.id}
                            className={classNames({
                                [tabsId]: props.id === activeId,
                                [styles.tabHeaderItem]: true,
                                [styles.active]: props.id === activeId,
                                [styles.lastChild]: index === children.length - 1,
                            })}
                            onClick={handleChangeActive(props.id)}
                        >
                            <span>{props.title}</span>
                        </div>
                    ),
                )}
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
