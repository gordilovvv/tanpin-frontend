import { create } from 'zustand';

export enum LoginStage {
    SIGN = 'sign',
    AGREE = 'agree'
}

type State = {
    stage: LoginStage | undefined,
    accessToken?: string
    connectError?: string,
    acceptedRules: boolean
}

type Actions = {
    setUser: (accessToken: string, acceptedRules: boolean) => void,
    resetUser: () => void
}

const ACCESS_TOKEN_KEY = 'accessToken';
const ACCEPTED_RULES_KEY = 'acceptedRules';

export const useUserStore = create<State & Actions>()((set) => ({
    stage: undefined,
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || undefined,
    acceptedRules: JSON.parse(localStorage.getItem(ACCEPTED_RULES_KEY) ?? 'false'),
    setUser: (accessToken: string, acceptedRules: boolean) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(ACCEPTED_RULES_KEY, `${ acceptedRules }`);

        set({
            accessToken,
            acceptedRules
        });
    },
    resetUser: () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(ACCEPTED_RULES_KEY);

        set({
            accessToken: undefined,
            acceptedRules: false
        });
    }
}));
