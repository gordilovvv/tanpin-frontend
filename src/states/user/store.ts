import { create } from 'zustand';

type UserState = {
    address: string;
    accessToken: string;
    refreshToken: string;
    completedRegistration: boolean;
    register: () => void;
    isLoggedIn: () => boolean;
}

export const useUserStore = create<UserState>()((set, get) => ({
    address: '',
    accessToken: '',
    refreshToken: '',
    completedRegistration: false,
    register: () => set(() => ({completedRegistration: true})),
    isLoggedIn: () => {
        const { accessToken, refreshToken } = get();
        return (accessToken !== '') && (refreshToken !== '');
    }
}));
