import React, { ReactNode } from 'react'
import styles from './Toast.css'
import classNames from 'classnames'
import CrossSvg from '../../assets/cross-thin.svg'
import WarningSvg from '../../assets/warning-round.svg'
import CheckMarkRoundSvg from '../../assets/check-mark-round.svg'
import EnvelopeSvg from '../../assets/envelope.svg'
import Button from '../Button'

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    title: ReactNode
    message?: ReactNode
    actionText?: string
    dismissText?: string
    onDismissClick?: () => void
    onActionClick?: () => void
    skin?: 'message' | 'success' | 'error'
}

const Toast: React.FC<ToastProps> = ({
    title,
    message,
    onActionClick,
    onDismissClick,
    skin = 'error',
    actionText,
    dismissText,
    className,
    ...rest
}) => {
    return (
        <div
            {...rest}
            className={classNames({
                [className]: Boolean(className),
                [styles.toast]: true,
                [styles[`skin-${skin}`]]: true,
            })}
        >
            <div className={styles.icon}>
                {skin === 'error' ? (
                    <WarningSvg width={22} />
                ) : skin === 'success' ? (
                    <CheckMarkRoundSvg width={22} />
                ) : (
                    <EnvelopeSvg width={24} />
                )}
            </div>
            <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                {message && <div className={styles.message}>{message}</div>}
                <div>
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
            </div>
            <CrossSvg onClick={onDismissClick} className={styles.close} width={11} />
        </div>
    )
}

export default Toast
