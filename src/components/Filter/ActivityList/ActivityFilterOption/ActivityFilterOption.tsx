import { useState } from 'react';
import { Mark, UnstyleButton } from '@/uikit';
import classNames from 'classnames';
import { option } from '../type';
import styles from './ActivityFilterOption.module.scss';

type ActivityFilterOptionProps = {
    option: option
    onChange: (option: option, isActive: boolean) => void,
    initialActive: boolean
}

export function ActivityFilterOption({ option, onChange, initialActive = false }: ActivityFilterOptionProps) {
    const [isActive, setIsActive] = useState(initialActive);
    const { label } = option;

    const handleClick = () => {
        onChange(option, !isActive);
        setIsActive(prev => !prev);
    };


    return (
        <UnstyleButton
            className={classNames(styles.label, {
                [styles.active]: isActive
            })}
            onClick={handleClick}
        >
            <div className={styles.box}>
                <Mark className={styles.mark} />
            </div>

            <div className={styles.title}>
                {label}
            </div>
        </UnstyleButton>
    );

}