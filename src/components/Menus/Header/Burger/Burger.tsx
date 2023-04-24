import { HTMLAttributes } from 'react';
import { UnstyleButton } from '@/uikit/Unstyle';
import classNames from 'classnames';
import styles from './Burger.module.scss';

type BurgerProps = {
    active: boolean
}

export function Burger({ active, className, ...props }: BurgerProps & HTMLAttributes<HTMLButtonElement>) {
    return (
        <UnstyleButton
            className={classNames(styles.burger, className, {
                [styles.active]: active
            })}
            {...props}
        >
            <div className={styles.content}></div>
        </UnstyleButton>
    );
}