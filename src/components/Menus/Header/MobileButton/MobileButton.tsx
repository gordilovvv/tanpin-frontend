import { HTMLAttributes, ReactNode } from 'react';
import { UnstyleButton } from '@/uikit';
import classNames from 'classnames';
import styles from './MobileButton.module.scss';

type MobileButtonProps = {
    active?: boolean
    defaultIcon: ReactNode
    activeIcon?: ReactNode
} & HTMLAttributes<HTMLButtonElement>

export function MobileButton({ active, defaultIcon, activeIcon, className, ...props }: MobileButtonProps) {
    return (
        <UnstyleButton
            className={classNames(styles.button, className, {
                [styles.active]: active
            })}
            {...props}
        >
            <div className={styles.defaultIcon}>
                {defaultIcon}
            </div>

            <div className={styles.activeIcon}>
                {activeIcon}
            </div>
        </UnstyleButton>
    );
}