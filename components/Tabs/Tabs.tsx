import React, { Dispatch, ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import styles from './Tabs.css'
import classNames from 'classnames'
import Button from '../Button'

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    children: React.ReactElement[]
    activeId: null | string
    skin?: 'default' | 'button' | 'group-button' | 'steps'
    size?: 's' | 'm' | 'l'
    onChange?: Dispatch<string | number>
    headerSpaceBetween?: boolean
    noItemHorizontalSpace?: boolean
    stretchWidth?: boolean
}

const InternalTabs: React.ForwardRefRenderFunction<HTMLElement, TabsProps> = ({
    size = 'm',
    skin = 'default',
    activeId,
    onChange,
    headerSpaceBetween,
    children,
    className,
    noItemHorizontalSpace,
    stretchWidth,
    ...rest
}) => {
    const isInitialIndicatorMount = useRef(true)
    const [tabIndicator, setTabIndicator] = useState({ offset: 0, width: 0 })

    const handleChangeActive = (id: string) => () => {
        onChange && onChange(id)
    }

    const tabsId = children[0].props.id

    useEffect(() => {
        const activeTab = document.getElementsByClassName(tabsId)[0] as HTMLDivElement

        setTabIndicator({
            offset: activeTab?.offsetLeft || 0,
            width: (skin === 'group-button' ? activeTab?.clientWidth + 1 || 0 : activeTab?.clientWidth) || 0,
        })

        if (tabIndicator.width !== 0) {
            isInitialIndicatorMount.current = false
        }
    }, [activeId, children])

    const activeTabContent = useMemo(() => children.find(({ props }: ReactElement) => props.id === activeId), [
        activeId,
    ])

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
                {children.map(({ props }: ReactElement, index) => {
                    const { id, title, ...rest } = props

                    return skin === 'button' ? (
                        <Button
                            {...rest}
                            skin={id === activeId ? 'action' : 'default'}
                            key={id}
                            size={size}
                            onClick={handleChangeActive(id)}
                            className={classNames({
                                [styles.lastChild]: index === children.length - 1,
                            })}
                        >
                            {title}
                        </Button>
                    ) : (
                        <div
                            {...rest}
                            key={id}
                            className={classNames({
                                [tabsId]: id === activeId,
                                [styles.tabHeaderItem]: true,
                                [styles.active]: id === activeId,
                                [styles.lastChild]: index === children.length - 1,
                                [styles.stretchWidth]: stretchWidth,
                            })}
                            onClick={handleChangeActive(id)}
                        >
                            <span>{title}</span>
                        </div>
                    )
                })}
                {(skin === 'default' || skin === 'button' || skin === 'group-button') && tabIndicator && (
                    <div
                        className={classNames({
                            [styles.indicator]: true,
                            [styles.noTransition]: isInitialIndicatorMount.current,
                        })}
                        style={{
                            transform: `translateX(${tabIndicator?.offset}px)`,
                            width: `${tabIndicator?.width}px`,
                        }}
                    />
                )}
            </div>
            {activeTabContent?.props?.children && (
                <div
                    className={classNames({
                        [styles.tabContent]: true,
                    })}
                >
                    {activeTabContent.props.children}
                </div>
            )}
        </div>
    )
}

export const Tabs = React.forwardRef<unknown, TabsProps>(InternalTabs)
export default Tabs
