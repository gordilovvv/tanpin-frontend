import { useCallback, useState } from 'react';
import { Address } from 'viem';
import { useLocksRefetch } from '@/states/claim/hooks';
import { TokenLock } from '@/states/claim/types';

export function useClaimLoadingModal(address: Address, locks?: TokenLock[]) {
    const { refetchLocks } = useLocksRefetch(address);
    const [isClaimPending, setIsClaimPending] = useState(false);

    const handleClaimSent = useCallback(async (lockId: string, retry: number = 0) => {
        setIsClaimPending(true);
        await refetchLocks();

        const lock = locks?.find(
            lock => lock.id === lockId
        );

        if (lock?.claimed) {
            setIsClaimPending(false);
        } else {
            if (retry < 5) {
                setTimeout(() => {
                    handleClaimSent(lockId, retry + 1);
                }, 6_000);
            } else {
                setIsClaimPending(false);
            }
        }
    }, [locks, refetchLocks]);

    return {
        isClaimPending,
        handleClaimSent
    };
}