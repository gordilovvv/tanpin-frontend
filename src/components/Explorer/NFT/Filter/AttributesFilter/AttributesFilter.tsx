import { useCallback } from 'react';
import { AttributesFilterOption } from './AttributesFilterOption/AttributesFilterOption';
import { AttributesDisclosure } from '../AttributesDisclosure/AttributesDisclosure';
import { useTokensFilterActions } from '@/states/explorer/hooks/useTokensFilterActions';
import { ActiveAttributesHashMap } from '../types';
import styles from './AttributesFilter.module.scss';

type AttributesFilterProps = {
    values: string[]
    traitType: string
    activeAttributes: ActiveAttributesHashMap
}

export function AttributesFilter({ values = [], traitType, activeAttributes }: AttributesFilterProps) {
    const { addAttribute, removeAttribute } = useTokensFilterActions();

    const handleChange = useCallback((isActive: boolean, value: string) => {
        const attribute = { value, traitType };

        if (isActive) {
            addAttribute(attribute);
        } else {
            removeAttribute(attribute);
        }
    }, [addAttribute, removeAttribute]);

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

