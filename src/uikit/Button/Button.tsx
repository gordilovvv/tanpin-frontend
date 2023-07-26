import { PropsWithChildren, ReactNode, forwardRef } from 'react';
import { LinkProps, useNavigate } from 'react-router-dom';
import { Spin } from '..';
import classNames from 'classnames';
import styles from './Button.module.scss';

enum View {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    NFTGTA = 'nftgta',
    DANGER = 'danger'
}

export type ButtonProps<T extends 'a' | 'button'> = {
    as?: T,
    to?: LinkProps['to'],
    view?: `${View}`
    block?: boolean
    loading?: boolean
    disabled?: boolean
    iconSlot?: ReactNode
} & JSX.IntrinsicElements[T];

declare function ButtonFn<Tag extends 'a' | 'button'>(props: PropsWithChildren<ButtonProps<Tag>>): JSX.Element;

export const Button = forwardRef<HTMLElement, PropsWithChildren<any>>(
    ({ as: Tag = 'button', view = 'primary', to, block, loading, disabled, iconSlot, onClick, children, className, ...props }, ref) => {
        const isLoading = !disabled && loading;
        const navigate = useNavigate();

        const handleClick = (event: MouseEvent) => {
            if (isLoading || disabled) {
                return;
            }

            if (to) {
                navigate(to);
            }

            onClick?.(event);
        };

        return (
            <Tag
                ref={ref}
                className={classNames(styles.button, styles[view], className, {
                    [styles.block]: block,
                    [styles.loading]: isLoading,
                    [styles.disabled]: disabled
                })}
                onClick={handleClick}
                {...props}
            >
                {isLoading && <span className={styles.buttonSpin}>
                    <Spin size='s' />
                </span>}

                {iconSlot && <span className={styles.buttonIcon}>
                    {iconSlot}
                </span>}

                {children && <span className={styles.buttonText}>
                    {children}
                </span>}
            </Tag>
        );
    }
) as typeof ButtonFn;

// @ts-ignore
Button.displayName = 'Button';