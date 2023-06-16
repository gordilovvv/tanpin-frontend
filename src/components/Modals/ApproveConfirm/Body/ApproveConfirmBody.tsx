import { useEffect, useState } from 'react';
import { Button } from '@/uikit';
import { TransactionStep } from '../Step/TransactionStep';
import { LoadingContent } from '../../Loading/LoadingContent';
import { useContractCall, useMarketContract } from '@/hooks/useContract';
import { LoadingStatus, useApproveConfirmCallbacks } from '@/hooks/useApproveConfirmCallbacks';
import { Hash } from 'viem';
import { activeChainId } from '@/config/chain';
import { CONTRACTS } from '@/config/constants/contracts';
import styles from './ApproveConfirmBody.module.scss';

enum Step {
    APPROVE = 'approve',
    CONFIRM = 'confirm'
}

type ApproveConfirmBodyProps = {
    tokenID: string
    tokenPrice: string
    tokenAmount: number
    onClose?: () => void
    onSuccess?: (confirmHash: Hash) => void
}

export function ApproveConfirmBody({ tokenID, tokenPrice, tokenAmount, onClose, onSuccess }: ApproveConfirmBodyProps) {
    const { callContract } = useContractCall();
    const marketContract = useMarketContract();

    const { state, isPreparing, handleApprove, handleConfirm } = useApproveConfirmCallbacks({
        spender: CONTRACTS.market[activeChainId],
        amount: tokenPrice,
        tokenAddress: CONTRACTS.usdt[activeChainId].address,
        tokenDecimals: CONTRACTS.usdt[activeChainId].decimals,
        onConfirm: async () => {
            if (!marketContract) {
                throw new Error('Market contract have not loaded!');
            }

            const sendRes = await callContract({
                contract: marketContract,
                method: 'buyDirectSale',
                args: [
                    BigInt(tokenID),
                    BigInt(tokenAmount)
                ]
            });

            return sendRes;
        },
        onConfirmSent: (hash) => {
            onClose?.();
            onSuccess?.(hash);
        }
    });

    const steps = {
        [Step.APPROVE]: handleApprove,
        [Step.CONFIRM]: handleConfirm
    };
    const [activeStep, setActiveStep] = useState(Step.APPROVE);

    const transactionError = state.approveState.error ?? state.confirmState.error;
    const retryTransaction = state.approveState.error
        ? handleApprove
        : handleConfirm;

    // Run active step on open
    useEffect(() => {
        if (!isPreparing && !transactionError) {
            steps[activeStep]();
        }
    }, [isPreparing, activeStep]);

    // After successful approve start confirm
    useEffect(() => {
        if (state.approveState.status === LoadingStatus.SUCCESS) {
            setActiveStep(Step.CONFIRM);
        }
    }, [state.approveState]);

    if (isPreparing) {
        return (<LoadingContent />);
    }

    return (
        <div className={styles.body}>
            <div className={styles.steps}>
                <TransactionStep
                    label='Approve tokens'
                    description='This transaction is conducted only once per asset type'
                    state={state.approveState}
                />

                <TransactionStep
                    label='Purchase asset'
                    description='Send transaction to purchase asset'
                    state={state.confirmState}
                />
            </div>

            <div className={styles.bottom}>
                {transactionError && <div className={styles.error}>
                    {transactionError}
                </div>}

                <div className={styles.buttons}>
                    {transactionError && <Button
                        view='primary'
                        onClick={retryTransaction}
                    >
                        Try again
                    </Button>}

                    <Button
                        view='secondary'
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}