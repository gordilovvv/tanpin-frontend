import { useSearchParams } from 'react-router-dom';
import { useTokensFilterState } from './useTokensFilterState';
import { useEffect } from 'react';
import { TokensFilterState } from '../TokensFilterStore';

function filterStateToQueryParams(filterState: TokensFilterState) {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(filterState)) {
        if (typeof value === 'string') {
            value
                ? params.set(key, value)
                : params.delete(key);
        }

        // if (key === 'attributes') {
        //     for (const attribute of value) {
        //         for (const selectedValue of attribute.values) {
        //             params.append(attribute.traitType, selectedValue);
        //         }
        //     }
        // }
    }

    return params;
}

export function useTokensFilterQueryParams() {
    const setSearchParams = useSearchParams()[1];
    const filterState = useTokensFilterState();

    useEffect(() => {
        const params = filterStateToQueryParams(filterState);

        setSearchParams(params);
    }, [filterState]);
}