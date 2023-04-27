import { AnchorHTMLAttributes, PropsWithChildren, forwardRef } from 'react';
import classNames from 'classnames';
import styles from './UnstyleLink.module.scss';

export const UnstyleLink = forwardRef<HTMLAnchorElement, PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>>(
    ({ className, children, ...props }, ref) => {
        return (
            <a
                ref={ref}
                className={classNames(styles.link, className)}
                {...props}
            >
                {children}
            </a>
        );
    }
);

UnstyleLink.displayName = 'UnstyleLink';