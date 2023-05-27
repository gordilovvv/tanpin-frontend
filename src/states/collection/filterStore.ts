import { create } from 'zustand';
import { NFTAttribute, NFTSaleStatus } from '../types';
import { NFTSort } from '../nft/types';

type State = {
    collectionID: string
    search: string
    sort: `${NFTSort}`
    status: `${NFTSaleStatus.FIXED_PRICE}` | `${NFTSaleStatus.AUCTION}`
    minPrice: string
    maxPrice: string
    attributes: {
        traitType: string
        values: string[]
    }[]
}

type Actions = {
    setMinPrice: (minPrice: State['minPrice']) => void
    setMaxPrice: (maxPrice: State['maxPrice']) => void
    addAttribute: (attribute: NFTAttribute) => void
    removeAttribute: (attribute: NFTAttribute) => void
    clearAttributes: () => void
    clearAllOfTraitType: (traitType: string) => void
    setSearch: (search: State['search']) => void
    setSort: (sort: State['sort']) => void
    setStatus: (status: State['status']) => void
    setCollectionID: (id: State['collectionID']) => void
}

export const useFilterStore = create<State & Actions>()(
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
        }
    })
);
