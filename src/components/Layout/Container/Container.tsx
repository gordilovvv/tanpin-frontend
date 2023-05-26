import { HTMLAttributes, PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './Container.module.scss';

type ContainerProps = {
    space?: boolean // Bottom Padding
}

/**
 * @param space Bottom Padding 
 */
export function Container({ space = false, children, className, ...props }: ContainerProps & PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
    return (
        <div
            className={classNames(styles.container, className, {
                [styles.space]: space
            })}
            {...props}
        >
            {children}
        </div>
    );
}