import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type FilterStore = {
    collectionID: string
    search: string
    sort: 'RECENTLY_ADDED' | 'HIGH_PRICE_FIRST' | 'LOW_PRICE_FIRST'
    status: 'FIXED_PRICE' | 'AUCTION' | 'NOT_FOR_SALE'
    minPrice: string
    maxPrice: string
    attributes: {
        traitType: string
        values: string[]
    }[]
}

type FilterActions = {
    addAttribute: (attribute: Attribute) => void
    removeAttribute: (attribute: Attribute) => void
    clearAllOfTraitType: (traitType: string) => void
    setSearch: (search: string) => void
    setSort: (sort: 'RECENTLY_ADDED' | 'HIGH_PRICE_FIRST' | 'LOW_PRICE_FIRST') => void
    setStatus: (status: 'FIXED_PRICE' | 'AUCTION' | 'NOT_FOR_SALE') => void
    setCollectionID: (id: string) => void
}

type Attribute = {
    traitType: string
    value: string
}

export const useFilterStore = create<FilterStore & FilterActions>()(devtools((set) => ({
    collectionID: '',
    search: '',
    sort: 'RECENTLY_ADDED',
    status: 'FIXED_PRICE',
    minPrice: '',
    maxPrice: '',
    attributes: [],
    addAttribute: (newAttribute) => set(store => {
        // Если аттрибуты пустые, просто кладём туда новый аттрибут
        if (store.attributes.length === 0) {
            return {
                ...store,
                attributes: [{ traitType: newAttribute.traitType, values: [newAttribute.value] }]
            };
        }

        // Проверяем, есть ли в сторе аттрибут c таким-же traitType
        const attributeFromStoreIndex =
            store.attributes.findIndex((storeAttribute) => storeAttribute.traitType === newAttribute.traitType);

        // Если нету, просто добавляем аттрибут в массив
        if (attributeFromStoreIndex === -1) {
            return {
                ...store,
                attributes: [...store.attributes, { traitType: newAttribute.traitType, values: [newAttribute.value] }]
            };
        }

        // Если в сторе уже есть аттрибут с таким же traitType,
        // то мы проверяем, есть ли в его массиве values такой же value
        // и если есть, то просто возвращаем старый стор
        const attributeFromStore = store.attributes[attributeFromStoreIndex];
        if (attributeFromStore.values.some(val => val === newAttribute.value)) {
            return store;
        }

        // А если нету, то добавляем newAttribute.value в массив values
        const newAttributes = store.attributes.map(attr => {
            if (attr.traitType === newAttribute.traitType) {
                return {
                    traitType: newAttribute.traitType,
                    values: [...attr.values, newAttribute.value]
                };
            }
            return attr;
        });
        return {
            ...store,
            attributes: newAttributes
        };
    }),
    removeAttribute: (attrToRemove) => set(store => {
        const indexOfTraitType = store.attributes.findIndex(attr => attr.traitType === attrToRemove.traitType);
        if (indexOfTraitType === -1) {
            return store;
        }

        const traitTypeToModify = store.attributes[indexOfTraitType];
        const filteredValues = traitTypeToModify.values.filter(val => val !== attrToRemove.value);
        if (filteredValues.length === 0) {
            // Remove this traitType completly
            return {
                ...store,
                attributes: store.attributes.filter(attr => attr.traitType !== attrToRemove.traitType)
            };
        }

        const modifiedTraitType = {
            ...traitTypeToModify,
            values: filteredValues
        };
        const newAttributes = store.attributes.map(attr => {
            if (attr.traitType === modifiedTraitType.traitType) {
                return modifiedTraitType;
            }
            return attr;
        });
        return {
            ...store,
            attributes: newAttributes
        };
    }),
    clearAllOfTraitType: (traitTypeToClear) => set(store => {
        return {
            ...store,
            attributes: store.attributes.filter(attr => attr.traitType !== traitTypeToClear)
        };
    }),
    clearAttributes: () => set(store => ({
        ...store,
        attributes: []
    })),
    setSort: (sort) => set(store => ({
        ...store,
        sort
    })),
    setStatus: (status) => set(store => ({
        ...store,
        status
    })),
    setCollectionID: (collectionID) => set(store => ({
        ...store,
        collectionID
    })),
    setSearch: (search) => set(store => ({
        ...store,
        search
    }))
})));
