
import { useActivityStore } from '@/states/activity/store';
import styles from './ActivityFilter.module.scss';
import { ActivityFilterOption } from './ActivityFilterOption/ActivityFilterOption';
import { option } from './type';

type ActivityFilterProps = {
    options: option[],
}

export function ActivityFilter({ options }: ActivityFilterProps) {
    const appendToFilterActivity = useActivityStore(state => state.appendToFilterActivity);
    const removeFromFilterActivity = useActivityStore(state => state.removeFromFilterActivity);

    const handleChange = (option: option, isActive: boolean) => {
        if (isActive) {
            appendToFilterActivity(option);
        } else {
            removeFromFilterActivity(option);
        }
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