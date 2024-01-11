import { useCallback, useMemo } from 'react';
import { Spin } from '@/uikit';
import { LoadingModal } from '@/components/Modals';
import { TokenValue } from '../Value/TokenValue';
import { ClaimButton } from '../Button/ClaimButton';
import { useClaimInfo } from './useClaimInfo';
import { useClaimLoadingModal } from './useClaimLoadingModal';
import { useClaimStore } from '@/states/claim/store';
import { useLocksFetch } from '@/states/claim/hooks';
import { formatTokenAmountV2 } from '@/utils/formatTokenAmount';
import { formatDate } from '@/utils/date';
import { isTouchDevice } from '@/utils/isTouchDevice';
import { Address } from 'viem';
import BigNumber from 'bignumber.js';
import styles from './ClaimAction.module.scss';

type ClaimActionProps = {
    address: Address
}

export function ClaimAction({ address }: ClaimActionProps) {
    const locks = useClaimStore(state => state.locks);
    const { isLoading } = useLocksFetch(address);
    const { totalAmount, nextUnlock, availableUnlocks } = useClaimInfo(locks);
    const { isClaimPending, handleClaimSent } = useClaimLoadingModal(address, locks);

    const currentUnlock = availableUnlocks[0] as {
        id: string,
        amount: string
    } | undefined;

    const totalAvailableAmount = useMemo(() => {
        return availableUnlocks.length
            ? availableUnlocks?.reduce((total, lock) => {
                return total.plus(lock.amount);
            }, new BigNumber(0)).toString()
            : undefined;
    }, [availableUnlocks]);

    const renderContent = useCallback(() => {
        if (isLoading) {
            return (
                <div className={styles.loader}>
                    {<Spin size={isTouchDevice ? 's' : 'm'} />}
                </div>
            );
        }

        return (
            <>
                <div className={styles.values}>
                    {totalAmount && <TokenValue
                        label='Total claimable amount:'
                        value={formatTokenAmountV2(totalAmount, 'TANPIN')}
                    />}

                    {nextUnlock && <TokenValue
                        label='Next unlock:'
                        value={formatDate(nextUnlock.timestamp)}
                    />}

                    {totalAvailableAmount && <TokenValue
                        label='Available now:'
                        value={formatTokenAmountV2(totalAvailableAmount, 'TANPIN')}
                    />}
                </div>

                <div className={styles.action}>
                    <ClaimButton
                        lockId={currentUnlock?.id}
                        amount={currentUnlock?.amount}
                        onClaimSent={handleClaimSent}
                    />
                </div>
            </>
        );
    }, [isLoading, totalAmount, totalAvailableAmount, currentUnlock, nextUnlock, handleClaimSent]);

    return (
        <div className={styles.wrap}>
            {renderContent()}

            <LoadingModal
                isOpen={isClaimPending}
                text={'Unlock request has been successfully submitted. Stay tuned for updates as soon as the transaction is confirmed.'}
            />
        </div>
    );
}