import { create } from 'zustand';

export enum Field {
    INPUT = 'INPUT',
    OUTPUT = 'OUTPUT'
}

type State = {
    activeField: Field,
    typedValue: string,
    [Field.INPUT]: { currencyId: string | undefined }
    [Field.OUTPUT]: { currencyId: 'tanpin' }
}

type Action = {
    typeValue: (params: { value: string, field: Field }) => void,
    selectCurrency: (params: { currencyId: string, field: Field }) => void
}

export const useDepositStore = create<State & Action>(set => ({
    activeField: Field.INPUT,
    typedValue: '',
    [Field.INPUT]: {
        currencyId: '',
    },
    [Field.OUTPUT]: {
        currencyId: 'tanpin'
    },

    typeValue: ({ value, field }) => {
        set({
            activeField: field,
            typedValue: value
        });
    },
    selectCurrency: ({ currencyId, field }: { field: Field, currencyId: string }) => {
        set({ [field]: { currencyId } });
    }
}));

export function useDepositState() {
    const [typedValue, activeField, inputField, outputField] = useDepositStore(state => [
        state.typedValue,
        state.activeField,
        state[Field.INPUT],
        state[Field.OUTPUT]
    ]);

    return {
        typedValue,
        activeField,
        inputCurrency: inputField.currencyId,
        outputCurrency: outputField.currencyId
    };
}

export function useDepositActions() {
    const [typeValue, selectCurrency] = useDepositStore(state => [
        state.typeValue,
        state.selectCurrency
    ]);

    return {
        typeValue,
        selectCurrency
    };
}