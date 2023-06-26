import { create } from 'zustand';
import { NFTAttribute, NFTSaleStatus } from '../types';

export enum NFTSort {
    RECENTLY_ADDED = 'RECENTLY_ADDED',
    HIGH_PRICE_FIRST = 'HIGH_PRICE_FIRST',
    LOW_PRICE_FIRST = 'LOW_PRICE_FIRST'
}

export type TokensFilterState = {
    search: string
    sort: NFTSort
    status: NFTSaleStatus.AUCTION | NFTSaleStatus.FIXED_PRICE
    minPrice: string
    maxPrice: string
    attributes: {
        traitType: string
        values: string[]
    }[]
}

type Actions = {
    setMinPrice: (minPrice: TokensFilterState['minPrice']) => void
    setMaxPrice: (maxPrice: TokensFilterState['maxPrice']) => void
    addAttribute: (attribute: NFTAttribute) => void
    removeAttribute: (attribute: NFTAttribute) => void
    clearAttributes: () => void
    clearAllOfTraitType: (traitType: string) => void
    setSearch: (search: TokensFilterState['search']) => void
    setSort: (sort: TokensFilterState['sort']) => void
    setStatus: (status: TokensFilterState['status']) => void
    replaceFilterState: (newState: Partial<TokensFilterState>) => void
}

export const useTokensFilterStore = create<TokensFilterState & Actions>()(
    (set) => ({
        search: '',
        sort: NFTSort.RECENTLY_ADDED,
        status: NFTSaleStatus.FIXED_PRICE,
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
        setSearch: (search) => {
            set({ search });
        },
        replaceFilterState: set
    })
);
