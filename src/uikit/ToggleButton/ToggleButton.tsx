import { ForwardedRef, PropsWithChildren, forwardRef } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';
import { UnstyleButton } from '..';
import classNames from 'classnames';
import styles from './ToggleButton.module.scss';

type ToggleButtonProps<T extends 'Button' | 'NavLink'> = {
    as?: T,
    to?: LinkProps['to'],
    view?: 'filled' | 'outline',
    active?: boolean,
    onClick?: () => void
}

declare function ToggleButtonFn<Tag extends 'Button' | 'NavLink'>(props: PropsWithChildren<ToggleButtonProps<Tag>>): JSX.Element;

// TODO: ПРОВЕРИТЬ AS
export const ToggleButton = forwardRef<any, PropsWithChildren<any>>(
    ({ as: tag = 'Button', to, view = 'filled', active, onClick, children }, ref) => {
        const renderContent = () => {
            return (<>
                <div className={styles.activeDecorator} />

                <div className={styles.text}>
                    {children}
                </div>
            </>);
        };

        if (tag === 'Button') {
            return (
                <UnstyleButton
                    ref={ref as ForwardedRef<HTMLButtonElement>}
                    className={classNames(styles.button, styles[view], {
                        [styles.active]: active
                    })}
                    onClick={onClick}
                >
                    {renderContent()}
                </UnstyleButton>
            );
        }

        return (
            <NavLink
                ref={ref as ForwardedRef<HTMLAnchorElement>}
                to={to}
                className={({ isActive }) => classNames(styles.button, styles[view], {
                    [styles.active]: isActive
                })}
                onClick={onClick}
            >
                {renderContent()}
            </NavLink>
        );
    }
) as typeof ToggleButtonFn;

// @ts-ignore
ToggleButton.displayName = 'ToggleName';