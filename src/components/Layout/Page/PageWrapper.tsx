import { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './PageWrapper.module.scss';

type PageWrapProps = {
    hasPaddingTop?: boolean
}

export function PageWrapper({ hasPaddingTop = true, children }: PropsWithChildren<PageWrapProps>) {
    return (
        <div
            id='PageWrapper'
            className={classNames(styles.wrapper, {
                [styles.paddingTop]: hasPaddingTop
            })}
        >
            {children}
        </div>
    );
}