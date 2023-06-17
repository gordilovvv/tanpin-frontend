import { ReactNode, useContext } from 'react';
import { ModalContext } from '../Context';
import { Close, UnstyleButton } from '@/uikit';
import styles from './ModalHead.module.scss';
import classNames from 'classnames';

type ModalHeadProps = {
    title: string | ReactNode
}

export function ModalHead({ title }: ModalHeadProps) {
    const context = useContext(ModalContext);

    return (
        <div
            className={classNames(styles.head, {
                [styles.hasClose]: !!context.close
            })}
        >

            <div className={styles.title}>
                {title}
            </div>

            {context.close && <UnstyleButton
                className={styles.close}
                onClick={context.close}
            >
                <Close />
            </UnstyleButton>}

        </div>
    );
}