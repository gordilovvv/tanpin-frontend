import { useState } from 'react';
import { Mark, UnstyleButton } from '@/uikit';
import classNames from 'classnames';
import styles from './AttributesFilterOption.module.scss';

type AttributesFilterOptionProps = {
    value: string
    onChange: (isActive: boolean, value: string) => void,
    initialActive: boolean
}

export function AttributesFilterOption({ value, onChange, initialActive = false }: AttributesFilterOptionProps) {
    const [isActive, setIsActive] = useState(initialActive);

    const handleClick = () => {
        onChange(!isActive, value);
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
                {value}
            </div>
        </UnstyleButton>
    );

}