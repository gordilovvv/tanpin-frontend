import { PropsWithChildren } from 'react';
import styles from './BlockWrap.module.scss';
import classNames from 'classnames';

type BlockWrapProps = {
    title: string,
    className?: string
}

export function BlockWrap({ children, title, className }: PropsWithChildren<BlockWrapProps>) {
    return (
        <div className={classNames(styles.wrapper, className)}>
            <div className={styles.title}>
                {title}
            </div>

            <div className={styles.body}>
                {children}
            </div>
        </div>
    );
}