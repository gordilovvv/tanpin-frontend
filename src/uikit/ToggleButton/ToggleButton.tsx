import { PropsWithChildren, forwardRef } from 'react';
import { UnstyleButton } from '..';
import classNames from 'classnames';
import styles from './ToggleButton.module.scss';

type ToggleButtonProps = {
    active?: boolean,
    onClick: () => void
}

export const ToggleButton = forwardRef<HTMLButtonElement, PropsWithChildren<ToggleButtonProps>>(
    ({ active, onClick, children }, ref) => {
        return (
            <UnstyleButton
                ref={ref}
                className={classNames(styles.button, {
                    [styles.active]: active
                })}
                onClick={onClick}
            >
                <div className={styles.activeDecorator} />

                <div className={styles.text}>
                    {children}
                </div>
            </UnstyleButton>
        );
    }
);

ToggleButton.displayName = 'ToggleName';