import React, { ReactNode } from 'react'
import styles from './Toast.css'
import classNames from 'classnames'
import CrossSvg from 'assets/cross-thin.svg'
import WarningSvg from 'assets/warning-round.svg'
import CheckMarkSvg from 'assets/check-mark.svg'
import EnvelopeSvg from 'assets/envelope.svg'
import { Button } from '../Button'

interface ToastProps {
    title: ReactNode
    message?: ReactNode
    actionText?: string
    dismissText?: string
    onDismissClick?: () => void
    onActionClick?: () => void
    skin?: 'message' | 'success' | 'error'
}

type AllProps = ToastProps & React.HTMLAttributes<HTMLDivElement>

const Index: React.FC<AllProps> = ({
    title,
    message,
    onActionClick,
    onDismissClick,
    skin = 'error',
    actionText,
    dismissText,
    ...rest
}) => {
    return (
        <div
            {...rest}
            className={classNames({
                [styles.toast]: true,
                [styles[`skin-${skin}`]]: true,
            })}
        >
            <div className={styles.icon}>
                {skin === 'error' ? (
                    <WarningSvg width={22} />
                ) : skin === 'success' ? (
                    <CheckMarkSvg width={16} />
                ) : (
                    <EnvelopeSvg width={24} />
                )}
            </div>
            <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                {message && <div className={styles.message}>{message}</div>}
                {actionText && (
                    <Button onClick={onActionClick} size="s">
                        {actionText}
                    </Button>
                )}
                {dismissText && (
                    <Button onClick={onDismissClick} size="s" skin="default">
                        {dismissText}
                    </Button>
                )}
            </div>
            <CrossSvg onClick={onDismissClick} className={styles.close} width={11} />
        </div>
    )
}

export const Toast = React.memo(Index)
