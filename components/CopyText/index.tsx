import React, { useState } from 'react'
import styles from './CopyText.css'
import classNames from 'classnames'
import copy from 'copy-to-clipboard'
import CopySvg from 'assets/copy.svg'
import Dropdown from '../Dropdown'
import CheckSvg from 'assets/check-mark.svg'

interface LinkProps {
    children: string
    /** Change text, which places in the children */
    textToCopy?: string
    /** Text in the Dropdown */
    successCopiedText?: string
    noIcon?: boolean
    highlightText?: boolean
    bold?: boolean
}

type AllProps = LinkProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>

const CopyText: React.FC<AllProps> = ({
    textToCopy,
    successCopiedText,
    bold,
    noIcon,
    highlightText,
    children,
    ...rest
}) => {
    const [active, setActive] = useState(false)

    const onCopy = (): void => {
        if (children) {
            copy(textToCopy || children)
        }
        setActive(true)

        setTimeout(() => setActive(false), 1000)
    }

    return (
        <div {...rest} className={styles.container} onClick={onCopy}>
            <div>
                <span
                    className={classNames({
                        [styles.text]: true,
                        [styles.highlight]: highlightText,
                        [styles.bold]: bold,
                    })}
                >
                    {children}
                </span>
                {!noIcon && <CopySvg width={16} />}
                <Dropdown active={active}>
                    <div className={styles.successText}>
                        {!successCopiedText && <CheckSvg width={12} />}
                        {successCopiedText || 'Copied'}
                    </div>
                </Dropdown>
            </div>
        </div>
    )
}

export default CopyText
