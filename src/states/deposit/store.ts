import { create } from 'zustand';

export enum Field {
    INPUT = 'INPUT',
    OUTPUT = 'OUTPUT'
}

type State = {
    activeField: Field,
    typedValue: string
}

type Action = {
    typeValue: (params: { value: string, field: Field }) => void,
}

export const useDepositStore = create<State & Action>(set => ({
    activeField: Field.INPUT,
    typedValue: '',

    typeValue: ({ value, field }) => {
        set({
            activeField: field,
            typedValue: value
        });
    }
}));