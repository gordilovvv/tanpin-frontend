import { useCallback } from 'react';
import { AttributesFilterOption } from './AttributesFilterOption/AttributesFilterOption';
import { AttributesDisclosure } from '../AttributesDisclosure/AttributesDisclosure';
import { ActiveAttributesHashMap } from '../types';
import { NFTAttribute } from '@/states/types';
import styles from './AttributesFilter.module.scss';

type AttributesFilterProps = {
    values: string[]
    traitType: string
    activeAttributes: ActiveAttributesHashMap,
    onAddAttribute: (attr: NFTAttribute) => void,
    onRemoveAttribute: (attr: NFTAttribute) => void
}

export function AttributesFilter({ values = [], traitType, activeAttributes, onAddAttribute, onRemoveAttribute }: AttributesFilterProps) {
    const handleChange = useCallback((isActive: boolean, value: string) => {
        const attribute = { value, traitType };

        if (isActive) {
            onAddAttribute(attribute);
        } else {
            onRemoveAttribute(attribute);
        }
    }, [onAddAttribute, onRemoveAttribute]);

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
                                active={activeAttributes[traitType]?.[value]}
                                onChange={handleChange}
                            />
                        );
                    })
                }
            </div>
        </AttributesDisclosure>
    );
}

