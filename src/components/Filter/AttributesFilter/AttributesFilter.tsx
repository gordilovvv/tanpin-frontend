import { AttributesFilterOption } from './AttributesFilterOption/AttributesFilterOption';
import { AttributesDisclosure } from '../AttributesDisclosure/AttributesDisclosure';
import { useFilterStoreActions } from '@/states/collection/hooks/useFilterStoreActions';
import { ActiveAttributesHashMap } from '../types';
import styles from './AttributesFilter.module.scss';

type AttributesFilterProps = {
    values: string[]
    traitType: string
    activeAttributes: ActiveAttributesHashMap
}

export function AttributesFilter({ values = [], traitType, activeAttributes }: AttributesFilterProps) {
    const { addAttribute, removeAttribute } = useFilterStoreActions();

    const handleChange = (isActive: boolean, value: string) => {
        const attribute = { value, traitType };

        if (isActive) {
            addAttribute(attribute);
        } else {
            removeAttribute(attribute);
        }
    };

    return (
        <AttributesDisclosure
            title={traitType}
            attributesCount={values.length}
        >
            <div className={styles.wrapper}>
                {
                    values.map(value => {
                        return (

                            <AttributesFilterOption
                                key={value}
                                value={value}
                                initialActive={activeAttributes[traitType]?.[value]}
                                onChange={handleChange}
                            />
                        );
                    })
                }
            </div>
        </AttributesDisclosure>
    );
}

