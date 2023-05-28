import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterState, useFilterStore } from '../filterStore';
import { NFTSort } from '@/states/nft/types';
import { NFTSaleStatus } from '@/states/types';

function parseSort(urlParam: string) {
    return [NFTSort.RECENTLY_ADDED, NFTSort.LOW_PRICE_FIRST, NFTSort.HIGH_PRICE_FIRST].includes(urlParam as any) ? urlParam : '';
}

function parseStatus(urlParam: string) {
    return [NFTSaleStatus.AUCTION, NFTSaleStatus.FIXED_PRICE].includes(urlParam as any) ? urlParam : '';
}

function parsePrice(urlParam: string) {
    return !Number.isNaN(parseFloat(urlParam)) ? `${parseFloat(urlParam)}` : '';
}

// TODO: add attributes
function queryParamsToFilterState(
    params: { [queryParam: string]: string },
    defaultSort: NFTSort,
    defaultStatus: NFTSaleStatus.AUCTION | NFTSaleStatus.FIXED_PRICE
): FilterState {
    return {
        sort: parseSort(params.sort) as FilterState['sort'] || defaultSort,
        status: parseStatus(params.status) as FilterState['status'] || defaultStatus,
        collectionID: params.collectionID || '',
        search: params.search || '',
        minPrice: parsePrice(params.minPrice),
        maxPrice: parsePrice(params.maxPrice),
        attributes: []
    };
}

function paramsToObject(params: URLSearchParams) {
    const obj = {
        collectionID: params.get('collectionID'),
        search: params.get('search'),
        minPrice: params.get('minPrice'),
        maxPrice: params.get('maxPrice'),
        sort: params.get('sort'),
        status: params.get('status')
    };

    for (const [key, value] of Object.entries(obj)) {
        if (value === null) {
            delete obj[key];
        }
    }

    return obj as { [queryParam: string]: string };
}

export function useDefaultsFromURL() {
    const [params] = useSearchParams();
    const replaceFilterState = useFilterStore(store => store.replaceFilterState);

    // Update filter state on mount
    useEffect(() => {
        const paramsObject = paramsToObject(params);
        const newFilterState = queryParamsToFilterState(
            paramsObject,
            NFTSort.RECENTLY_ADDED,
            NFTSaleStatus.FIXED_PRICE
        );

        replaceFilterState(newFilterState);
    }, []);
}
