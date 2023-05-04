import useSWR from 'swr'
import { useUserStore } from '../store'
import { pingPong } from '../fetch/pingPong';
import { useEffect } from 'react';

export function usePingPong() {
    const resetUser = useUserStore(store => store.resetUser);
    const { data: pong } = useSWR('pingPong', pingPong);

    useEffect(() => {
        if (pong?.status === 401) {
            resetUser();
        }
    }, [pong])
}

