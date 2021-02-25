import React, { useRef, useState } from 'react'
import styles from './Tip.css'
import classNames from 'classnames'
import Dropdown, { DropdownProps } from '../Dropdown'

interface ToastProps {
    title?: React.ReactNode
    children?: React.ReactNode
    onlyButton?: boolean
    dropdownProps?: DropdownProps
    openingMode?: 'blur' | 'click'
}

type AllProps = ToastProps & React.HTMLAttributes<HTMLDivElement>

const Tip: React.FC<AllProps> = ({
    title,
    dropdownProps,
    children,
    onlyButton,
    openingMode = 'blur',
    ...rest
}) => {
    const ref = useRef()
    const [openedPopup, setOpenedPopup] = useState(false)

    const handleClick = () => {
        setOpenedPopup((prev) => !prev)
    }

    const handleMouseOver = () => {
        if (openingMode === 'blur' && !openedPopup) {
            setOpenedPopup(true)
        }
    }

    const handleMouseOut = () => {
        if (openingMode === 'blur' && openedPopup) {
            setOpenedPopup(false)
        }
    }

    return (
        <div
            {...rest}
            className={classNames({
                [styles.tip]: true,
                [styles.onlyButton]: onlyButton,
            })}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onBlur={() => setOpenedPopup(false)}
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
                <span className={styles.button}>?</span>
                {!onlyButton && (
                    <Dropdown {...dropdownProps} active={openedPopup}>
                        {children}
                    </Dropdown>
                )}
            </div>
        </div>
    )
}

export default Tip
