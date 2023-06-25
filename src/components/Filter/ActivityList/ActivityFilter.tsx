
import { useActivityStore } from '@/states/activity/store';
import styles from './ActivityFilter.module.scss';
import { ActivityFilterOption } from './ActivityFilterOption/ActivityFilterOption';

type ActivityFilterProps = {
    options: { value: string, label: string }[],
}

export function ActivityFilter({ options }: ActivityFilterProps) {
    const selectUserActivityOption = useActivityStore(state => state.selectUserActivityOption);
    const removeUserActivityOption = useActivityStore(state => state.removeUserActivityOption);
    const filterActivity = useActivityStore(state => state.filterActivity);


    const handleChange = ({ value }: { value: string, label: string }, isActive: boolean) => {
        if (isActive) {
            selectUserActivityOption(value);
        } else {
            removeUserActivityOption(value);
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