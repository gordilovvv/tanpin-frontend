import { useSearchParams } from 'react-router-dom';
import { NFTSaleStatus } from '@/states/types';
import { useEffect } from 'react';
import { FilterState, useFilterStore } from '../filterStore';
import { NFTSort } from '@/states/nft/types';

export function useDefaultsFromURL() {
    const [params] = useSearchParams();
    const replaceFilterState = useFilterStore(store => store.replaceFilterState);
    useEffect(() => {
        const paramsObject = paramsToObject(params);
        const newFilterState = queryParamsToFilterState(paramsObject, 'RECENTLY_ADDED', NFTSaleStatus.FIXED_PRICE);
        replaceFilterState(newFilterState);
    }, [params, replaceFilterState]);
}


type ParamsObject = {
    collectionID: string
    search: string
    minPrice: string
    maxPrice: string
    sort: string
    status: string
}

function paramsToObject(params: URLSearchParams): ParamsObject {
    return {
        collectionID: params.get('collectionID') ?? '',
        search: params.get('search') ?? '',
        minPrice: params.get('minPrice') ?? '',
        maxPrice: params.get('maxPrice') ?? '',
        sort: params.get('sort') ?? '',
        status: params.get('status') ?? ''
    };

}

function queryParamsToFilterState(params: ParamsObject, defaultSort: `${NFTSort}`, defaultStatus: NFTSaleStatus.AUCTION | NFTSaleStatus.FIXED_PRICE,): Omit<FilterState, 'attributes'> {
    const sort = validateSort(params.sort, defaultSort);
    const status = validateStatus(params.status, defaultStatus);
    const minPrice = validatePrice(params.minPrice);
    const maxPrice = validatePrice(params.maxPrice);

    // Я хз как их валидировать
    // Из функции paramsToObject
    // в любом случае приходят пустые строки
    const { collectionID, search } = params;

    return {
        collectionID,
        search,
        sort,
        status,
        minPrice,
        maxPrice,
    };
}

function validatePrice(priceString: string): string {
    if (!isNumeric(priceString)) {
        return '0';
    }
    const priceNumber = Number(priceString);
    if (priceNumber >= 0) {
        return priceString;
    }
    return '0';
}

function isNumeric(string: string): boolean {
    if (typeof string !== 'string') {
        return false; // we only process strings!  
    }
    return !isNaN(string as unknown as number) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(string)); // ...and ensure strings of whitespace fail
}

function validateSort(sort: string, defaultSort: `${NFTSort}`): `${NFTSort}` {
    if (sort !== 'RECENTLY_ADDED' && sort !== 'HIGH_PRICE_FIRST' && sort !== 'LOW_PRICE_FIRST') {
        return defaultSort;
    }
    return sort;
}

function validateStatus(status: string, defaultStatus: NFTSaleStatus.AUCTION | NFTSaleStatus.FIXED_PRICE): NFTSaleStatus.AUCTION | NFTSaleStatus.FIXED_PRICE {
    if (status !== NFTSaleStatus.AUCTION && status !== NFTSaleStatus.FIXED_PRICE) {
        return defaultStatus;
    }
    return status;
}




