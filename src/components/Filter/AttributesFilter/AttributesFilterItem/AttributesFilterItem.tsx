import styles from './AttributesFilterItem.module.scss';
import { useState } from 'react';
import classNames from 'classnames';
import { Mark, UnstyleButton } from '@/uikit';


type AttributesFilterItemProps = {
    info: {
        value: string,
        label: string,
        count?: number
    }
}

export function AttributesFilterItem({ info }: AttributesFilterItemProps) {
    const [isActive, setIsActive] = useState(false);
    const handleClick = () => setIsActive(prev => !prev);


    const { value, label, count } = info;
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

            {count && <div className={styles.count}>{count}3 {+count === 1 ? 'item' : 'items'}</div>}
        </UnstyleButton>
    );

}