import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Field, useDepositStore } from '../store';

function parseActiveFieldURLParameter(urlParam: any): Field {
    return typeof urlParam === 'string' && urlParam.toLowerCase() === 'output' ? Field.OUTPUT : Field.INPUT;
}

function parseTokenAmountURLParameter(urlParam: any): string {
    return typeof urlParam === 'string' && !Number.isNaN(parseFloat(urlParam)) ? urlParam : '';
}

function queryParametersToDepositState(searchParams: URLSearchParams) {
    return {
        activeField: parseActiveFieldURLParameter(searchParams.get('activeField')),
        typedValue: parseTokenAmountURLParameter(searchParams.get('amount'))
    };
}

export function useDefaultsFromURLSearch() {
    const [searchParams] = useSearchParams();
    const replaceDepositState = useDepositStore(state => state.replaceState);

    useEffect(() => {
        const { activeField, typedValue } = queryParametersToDepositState(searchParams);

        replaceDepositState({
            activeField,
            typedValue
        });
    }, [searchParams, replaceDepositState]);
}