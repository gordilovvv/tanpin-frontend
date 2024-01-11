import { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { TokenLock } from '@/states/claim/types';

export function useClaimInfo(locks: TokenLock[] | undefined) {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    const totalAmount = useMemo(() => {
        return locks?.reduce((total, lock) => {
            return total.plus(lock.amount);
        }, new BigNumber(0)).toString();
    }, [locks]);

    const availableUnlocks = useMemo(() => {
        const unlockedLocks = locks?.filter((lock) => {
            return lock.unlockTimestamp <= currentTimestamp && !lock.claimed;
        }) ?? [];

        return unlockedLocks.map(lock => ({
            id: lock.id,
            amount: lock.amount
        }));
    }, [locks]);

    const nextUnlock = useMemo(() => {
        const futureLocks = locks?.filter((lock) => {
            return lock.unlockTimestamp > currentTimestamp;
        }) ?? [];

        if (futureLocks.length > 0) {
            const nearestLock = futureLocks.reduce((nearest, lock) => {
                const timeDifference = lock.unlockTimestamp - currentTimestamp;

                return timeDifference < nearest.timeDifference
                    ? { lock, timeDifference }
                    : nearest;
            }, {
                lock: futureLocks[0],
                timeDifference: futureLocks[0].unlockTimestamp - currentTimestamp
            });

            return {
                id: nearestLock.lock.id,
                amount: nearestLock.lock.amount,
                timestamp: nearestLock.lock.unlockTimestamp * 1000
            };
        }

        return undefined;
    }, [locks]);

    return {
        nextUnlock,
        totalAmount,
        availableUnlocks
    };
}