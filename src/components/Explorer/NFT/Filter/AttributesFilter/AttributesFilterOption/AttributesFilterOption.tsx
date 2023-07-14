import { Mark, UnstyleButton } from '@/uikit';
import classNames from 'classnames';
import styles from './AttributesFilterOption.module.scss';

type AttributesFilterOptionProps = {
    value: string
    active: boolean
    onChange: (isActive: boolean, value: string) => void,
}

export function AttributesFilterOption({ value, onChange, active }: AttributesFilterOptionProps) {
    const handleClick = () => {
        onChange(!active, value);
    };

    return (
        <UnstyleButton
            className={classNames(styles.label, {
                [styles.active]: active
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