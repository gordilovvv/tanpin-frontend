import { PropsWithChildren, ReactNode, forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

enum View {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

type ButtonProps<T extends 'a' | 'button'> = {
    as?: T,
    view?: `${View}`
    block?: boolean
    loading?: boolean
    disabled?: boolean
    iconSlot?: ReactNode
    onClick?: (event?: MouseEvent) => void
} & JSX.IntrinsicElements[T];

declare function ButtonFn<Tag extends 'a' | 'button'>(props: PropsWithChildren<ButtonProps<Tag>>): JSX.Element;

// TODO:
// 1. Add loading
export const Button = forwardRef<HTMLElement, PropsWithChildren<any>>(
    ({ as: Tag = 'button', view = 'primary', block, loading, disabled, iconSlot, onClick, children }, ref) => {
        const isLoading = !disabled && loading;

        const handleClick = () => {
            if (isLoading || disabled) {
                return;
            }

            onClick?.();
        };

        return (
            <Tag
                ref={ref}
                className={classNames(styles.button, styles[view], {
                    [styles.block]: block,
                    [styles.loading]: isLoading,
                    [styles.disabled]: disabled
                })}
                onClick={handleClick}
            >
                {/* {isLoading && <Spin className={styles.spin} />} */}

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