
import styles from './ActivityFilter.module.scss';
import { ActivityFilterOption } from './ActivityFilterOption/ActivityFilterOption';
import { option } from './type';

type ActivityFilterProps = {
    options: option[],
}

export function ActivityFilter({ options }: ActivityFilterProps) {
    const handleChange = (option: option, isActive: boolean) => {
        console.log(option, isActive); //T0D0 set in store.ts
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Filters</div>

            <div className={styles.inner}>
                {options.map((option) => <ActivityFilterOption
                    key={option.value}
                    initialActive={false}
                    onChange={handleChange}
                    option={option}
                />)}
            </div>
        </div>
    );
}