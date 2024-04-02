import { CSSProperties, HTMLAttributes, PropsWithChildren, forwardRef } from 'react';
import styles from './ToggleGroup.module.scss';
import classNames from 'classnames';

export const ToggleGroup = forwardRef<HTMLDivElement, PropsWithChildren<HTMLAttributes<HTMLDivElement>>>(
    ({ className, children, style, ...props }, ref) => {
        const cols = Array.isArray(children) ? children.filter(child => !!child).length : 1;

        return (
            <div
                ref={ref}
                className={classNames(styles.group, className)}
                style={{ '--cols-count': cols, ...style } as CSSProperties}
                {...props}
            >
                {children}
            </div>
        );
    }
);

ToggleGroup.displayName = 'ToggleGroup';