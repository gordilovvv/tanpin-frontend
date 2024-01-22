import { useCallback, useState } from 'react';
import { useUserStore } from '../store';
import { acceptRules as acceptRulesFetch } from '../fetch/acceptRules';

export function useRulesAccept() {
    const [isLoading, setIsLoading] = useState(false);
    const setUser = useUserStore(state => state.setUser);
    const accessToken = useUserStore(state => state.accessToken);

    const acceptRules = useCallback(async () => {
        try {
            if (isLoading) {
                return;
            }

            if (!accessToken) {
                throw new Error('Only logged users can accept terms.');
            }

            setIsLoading(true);

            await acceptRulesFetch(accessToken);

            setUser(accessToken, true);
        } catch (error) {
            throw new Error((error as Error)?.message);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, accessToken, setUser, setIsLoading]);

    return {
        isLoading,
        acceptRules
    };
}