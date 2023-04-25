import { useUserStore } from '../store';

export const useRegistration = () => {
    return useUserStore(state => state.register);
};
