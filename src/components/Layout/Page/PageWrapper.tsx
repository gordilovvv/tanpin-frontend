import { CSSProperties, PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './PageWrapper.module.scss';

type PageWrapProps = {
    hasPaddingTop?: boolean,
    style: CSSProperties
}

export function PageWrapper({ hasPaddingTop = true, style, children }: PropsWithChildren<PageWrapProps>) {
    return (
        <div
            id='PageWrapper'
            className={classNames(styles.wrapper, {
                [styles.paddingTop]: hasPaddingTop
            })}
            style={style}
        >
            {children}
        </div>
    );
}