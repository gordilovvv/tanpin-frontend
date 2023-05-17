import { AttributesFilterOption } from './AttributesFilterOption/AttributesFilterOption';
import { AttributesDisclosure } from '../AttributesDisclosure/AttributesDisclosure';
import { useFilterStoreActons } from '@/states/collection/hooks/useFilterStoreActions';
import styles from './AttributesFilter.module.scss';

type AttributesFilterProps = {
    values: string[]
    traitType: string
    activeAttributes: {
        [key: string]: { [key: string]: boolean };
    }
}

export function AttributesFilter({ values = [], traitType, activeAttributes }: AttributesFilterProps) {
    const { addAttribute, removeAttribute } = useFilterStoreActons();

    const handleChange = (isActive: boolean, value) => {
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
        // </div>
    );
}

