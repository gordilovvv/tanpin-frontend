import styles from './AttributesFilter.module.scss';
import { useFilterStoreActons } from '@/states/collection/hooks/useFilterStoreActions';

import { AttributesFilterItem } from './AttributesFilterItem/AttributesFilterItem';



type AttributesFilterProps = {
    values: string[]
    traitType: string
    activeAttributes: Hashmap
}

type Hashmap = {
    [key: string]: { [key: string]: boolean };
}

export function AttributesFilter({ values = [], traitType, activeAttributes }: AttributesFilterProps) {
    const { addAttribute, removeAttribute } = useFilterStoreActons();




    const hangleChange = (isActive: boolean, value) => {
        const attribute = { value, traitType };
        if (isActive) {
            addAttribute(attribute);
            return;
        }
        if (!isActive) {
            removeAttribute(attribute);
            return;
        }
    };

    return (
        <div className={styles.wrapper}>
            {
                values.map(value => {
                    return (
                        <AttributesFilterItem
                            key={value}
                            value={value}
                            initialActive={activeAttributes[traitType]?.[value]}
                            onChange={hangleChange}
                        />
                    );
                })
            }
        </div>
    );
}

