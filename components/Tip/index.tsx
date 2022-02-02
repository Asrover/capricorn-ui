import React, { useRef, useState } from 'react'
import styles from './Tip.css'
import classNames from 'classnames'
import Dropdown, { DropdownProps } from '../Dropdown'
import useWindowSize from 'react-use/esm/useWindowSize'
import CrossSvg from '../../assets/cross-thin.svg'

export type TipProps = {
    title?: React.ReactNode
    children?: React.ReactNode
    onlyButton?: boolean
    customButton?: React.ReactNode
    dropdownProps?: DropdownProps
    openingMode?: 'blur' | 'click'
} & React.HTMLAttributes<HTMLDivElement>

const Tip: React.FC<TipProps> = ({
    title,
    dropdownProps,
    children,
    onlyButton,
    customButton,
    openingMode = 'blur',
    className,
    ...rest
}) => {
    const ref = useRef()
    const [openedPopup, setOpenedPopup] = useState(false)
    const windowWidth = useWindowSize().width

    const handleClick = () => {
        if (openingMode === 'blur') {
            setOpenedPopup(true)
        } else {
            setOpenedPopup(!openedPopup)
        }
    }

    const handleMouseOver = () => {
        if (openingMode === 'blur' || windowWidth < 600) {
            setOpenedPopup(true)
        }
    }

    const handleMouseOut = () => {
        if (openingMode === 'blur' || windowWidth < 600) {
            setOpenedPopup(false)
        }
    }

    const handleCrossClick = (e) => {
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        setOpenedPopup(false)
    }

    const handleBlur = () => {
        setOpenedPopup(false)
    }

    return (
        <div
            {...rest}
            className={classNames({
                [className]: Boolean(className),
                [styles.tip]: true,
                [styles.onlyButton]: onlyButton,
            })}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onBlur={handleBlur}
        >
            <div
                className={classNames({
                    [styles.container]: true,
                    [styles.cursorPointer]: openingMode === 'click',
                })}
                ref={ref}
                onClick={handleClick}
            >
                {title && <div>{title}</div>}
                {customButton || <span className={styles.button}>?</span>}
                {!onlyButton && (
                    <Dropdown
                        {...dropdownProps}
                        position={windowWidth > 600 ? dropdownProps?.position : 'bottom'}
                        active={openedPopup}
                        toggleFullScreenWhenMobile
                    >
                        {children}
                        {windowWidth < 600 && (
                            <CrossSvg className={styles.cross} onClick={handleCrossClick} width={12} />
                        )}
                    </Dropdown>
                )}
            </div>
        </div>
    )
}

export default Tip
