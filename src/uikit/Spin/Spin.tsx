import { HTMLAttributes, forwardRef } from 'react';
import styles from './Spin.module.scss';
import classNames from 'classnames';

type SpinProps = {
    size: 's' | 'm' // s - 24px, m - 48px
}

export const Spin = forwardRef<HTMLDivElement, SpinProps & HTMLAttributes<HTMLDivElement>>(
    ({ size, className, ...props }, ref) => {
        return <div
            ref={ref}
            className={classNames(styles.spin, styles[size], className)}
            {...props}
        />;
    }
);

Spin.displayName = 'Spin';