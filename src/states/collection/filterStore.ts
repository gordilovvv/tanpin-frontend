import { create } from 'zustand';
import { NFTAttribute, NFTSaleStatusString } from '../types';
import { NFTSortString } from '../nft/types';

export type FilterState = {
    collectionID: string
    search: string
    sort: NFTSortString
    status: Exclude<NFTSaleStatusString, 'NOT_FOR_SALE'>
    minPrice: string
    maxPrice: string
    attributes: {
        traitType: string
        values: string[]
    }[]
}

type Actions = {
    setMinPrice: (minPrice: FilterState['minPrice']) => void
    setMaxPrice: (maxPrice: FilterState['maxPrice']) => void
    addAttribute: (attribute: NFTAttribute) => void
    removeAttribute: (attribute: NFTAttribute) => void
    clearAttributes: () => void
    clearAllOfTraitType: (traitType: string) => void
    setSearch: (search: FilterState['search']) => void
    setSort: (sort: FilterState['sort']) => void
    setStatus: (status: FilterState['status']) => void
    setCollectionID: (id: FilterState['collectionID']) => void
    replaceFilterState: (newState: Partial<FilterState>) => void
}

export const useFilterStore = create<FilterState & Actions>()(
    (set) => ({
        collectionID: '',
        search: '',
        sort: 'RECENTLY_ADDED',
        status: 'FIXED_PRICE',
        minPrice: '',
        maxPrice: '',
        attributes: [],
        setMinPrice: (minPrice) => {
            set({ minPrice });
        },
        setMaxPrice: (maxPrice) => {
            set({ maxPrice });
        },
        addAttribute: (attribute) => {
            set((store) => {
                // Check if attribute already have existed
                const existedAttributeIndex = store.attributes.findIndex(({ traitType }) => traitType === attribute.traitType);

                // Add attribute
                if (existedAttributeIndex === -1) {
                    return {
                        attributes: [
                            ...store.attributes,
                            {
                                traitType: attribute.traitType,
                                values: [attribute.value]
                            }
                        ],
                    };
                }

                // Or check if is's value
                const existedAttribute = store.attributes[existedAttributeIndex];

                // If exist - stop
                if (existedAttribute.values.some((val) => val === attribute.value)) {
                    return store;
                }

                // Or add new attribute value
                const updatedAttributes = store.attributes.map((attr) => {
                    if (attr.traitType === attribute.traitType) {
                        return {
                            traitType: attribute.traitType,
                            values: [
                                ...attr.values,
                                attribute.value
                            ],
                        };
                    }

                    return attr;
                });

                return { attributes: updatedAttributes };
            });
        },
        removeAttribute: (attribute) => {
            set((store) => {
                const existedAttribute = store.attributes.find(
                    (attr) => attr.traitType === attribute.traitType
                );

                // If we didn't find the attribute
                if (!existedAttribute) {
                    return store;
                }

                const updatedAttributes: typeof store.attributes = [];

                // Rebuild attributes object
                for (const { traitType, values } of store.attributes) {
                    if (traitType === attribute.traitType) {
                        const filteredValues = values.filter(value => value !== attribute.value);

                        if (filteredValues.length) {
                            updatedAttributes.push({
                                traitType,
                                values: filteredValues
                            });
                        }
                    } else {
                        updatedAttributes.push({
                            traitType,
                            values
                        });
                    }
                }

                return { attributes: updatedAttributes };
            });
        },
        clearAllOfTraitType: (traitTypeToClear) => {
            set(store => ({
                attributes: store.attributes.filter((attr) => attr.traitType !== traitTypeToClear)
            }));
        },
        clearAttributes: () => {
            set({ attributes: [] });
        },
        setSort: (sort) => {
            set({ sort });
        },
        setStatus: (status) => {
            set({ status });
        },
        setCollectionID: (collectionID) => {
            set({ collectionID });
        },
        setSearch: (search) => {
            set({ search });
        },
        replaceFilterState: set
    })
);
