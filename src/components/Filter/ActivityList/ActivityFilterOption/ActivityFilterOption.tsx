import { useState } from 'react';
import { Mark, UnstyleButton } from '@/uikit';
import { ActivityType } from '@/states/activity/types';
import classNames from 'classnames';
import styles from './ActivityFilterOption.module.scss';

type ActivityFilterOptionProps = {
    title: string
    value: ActivityType | ActivityType[]
    onChange: (value: ActivityType | ActivityType[], isActive: boolean) => void
    initialActive: boolean
}

export function ActivityFilterOption({ title, value, onChange, initialActive = false }: ActivityFilterOptionProps) {
    const [isActive, setIsActive] = useState(initialActive);

    const handleClick = () => {
        onChange(value, !isActive);
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
                {title}
            </div>
        </UnstyleButton>
    );

}