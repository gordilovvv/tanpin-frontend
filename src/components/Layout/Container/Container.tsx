import { HTMLAttributes, PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './Container.module.scss';

type ContainerProps = {
    space?: boolean // Bottom Padding
    maxWidth?: number
}

/**
 * @param space Bottom Padding 
 */
export function Container({ space = false, children, maxWidth = 1630, className, ...props }: ContainerProps & PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
    const containerPadding = 15;
    const width = maxWidth + containerPadding * 2;

    return (
        <div
            className={classNames(styles.container, className, {
                [styles.space]: space
            })}
            style={{
                ['--page-padding' as string]: `${containerPadding}px`,
                maxWidth: `${width}px`
            }}

            {...props}
        >
            {children}
        </div>
    );
}