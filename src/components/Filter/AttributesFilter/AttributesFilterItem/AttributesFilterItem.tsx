import styles from './AttributesFilterItem.module.scss';
import { useState } from 'react';
import classNames from 'classnames';
import { Mark, UnstyleButton } from '@/uikit';


type AttributesFilterItemProps = {
    value: string
    onChange: (isActive: boolean, value: string) => void,
    initialActive: boolean
}

export function AttributesFilterItem({ value, onChange, initialActive = false }: AttributesFilterItemProps) {
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

            {/* {count && <div className={styles.count}>{count}3 {+count === 1 ? 'item' : 'items'}</div>} */}
        </UnstyleButton>
    );

}