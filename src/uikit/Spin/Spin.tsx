import { HTMLAttributes, forwardRef } from 'react';
import styles from './Spin.module.scss';
import classNames from 'classnames';

type SpinProps = {
    size: 's' // s - 24px
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