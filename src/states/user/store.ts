import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';

type State = {
    loginSigned: boolean
}

type Actions = {
    setUser: (data: { loginSigned: boolean }) => void,
    resetUser: () => void
}

const LOGIN_SIGNED_KEY = 'tanpin.login.signed';

export const useUserStore = create<State & Actions>()((set) => ({
    loginSigned: JSON.parse(localStorage.getItem(LOGIN_SIGNED_KEY) ?? 'false'),

    setUser: ({ loginSigned }) => {
        localStorage.setItem(LOGIN_SIGNED_KEY, `${loginSigned}`);

        set({ loginSigned });
    },
    resetUser: () => {
        localStorage.removeItem(LOGIN_SIGNED_KEY);

        set({ loginSigned: false });
    }
}));

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('Store', useUserStore);
}
