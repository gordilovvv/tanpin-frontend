import { useCallback, useReducer } from 'react';
import { Address, Hash } from 'viem';
import { SendTransactionResult } from 'wagmi/actions';
import { viemClient } from '@/config/viem';
import { useTokenApprove } from './useTokenApprove';
import { logError } from '@/utils/sentry';
import { walletErrorToUserReadableMessage } from '@/utils/walletErrorToUserReadableMessage';

export enum LoadingStatus {
    IDLE = 'IDLE',
    LOADING = 'loading',
    SUCCESS = 'success',
    FAIL = 'fail'
}

type State = {
    approveState: {
        error?: string
        status: LoadingStatus
    }
    confirmState: {
        error?: string
        status: LoadingStatus
    }
}

type Action = {
    type: 'approveSending' | 'approveReceipt' | 'confirmSending' | 'confirmSent'
} | {
    type: 'approveError' | 'confirmError'
    errorMessage: string
}

const initialState: State = {
    approveState: {
        error: undefined,
        status: LoadingStatus.IDLE
    },
    confirmState: {
        error: undefined,
        status: LoadingStatus.IDLE
    }
};

function reducer(state: State, actions: Action): State {
    switch (actions.type) {
        case 'approveSending':
            return {
                ...state,
                approveState: {
                    error: undefined,
                    status: LoadingStatus.LOADING
                }
            };
        case 'approveReceipt':
            return {
                ...state,
                approveState: {
                    error: undefined,
                    status: LoadingStatus.SUCCESS
                }
            };
        case 'approveError':
            return {
                ...state,
                approveState: {
                    error: actions.errorMessage,
                    status: LoadingStatus.FAIL
                }
            };
        case 'confirmSending':
            return {
                ...state,
                confirmState: {
                    error: undefined,
                    status: LoadingStatus.LOADING
                }
            };
        case 'confirmSent':
            return {
                ...state,
                confirmState: {
                    error: undefined,
                    status: LoadingStatus.SUCCESS
                }
            };
        case 'confirmError':
            return {
                ...state,
                confirmState: {
                    error: actions.errorMessage,
                    status: LoadingStatus.FAIL
                }
            };
        default:
            return state;
    }
}

export function useApproveConfirmCallbacks({
    tokenAddress,
    tokenDecimals,
    spender,
    amount,
    onConfirm,
    onConfirmSent,
}: {
    spender?: Address
    amount: string
    tokenAddress: Address
    tokenDecimals: number
    onConfirm: () => Promise<SendTransactionResult>
    onConfirmSent: (hash: Hash) => void
}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { approve, isPreparing, isApproved } = useTokenApprove(
        tokenAddress,
        tokenDecimals,
        spender,
        amount
    );

    // Approve transaction
    const handleApprove = useCallback(async () => {
        try {
            if (state.approveState.status === LoadingStatus.LOADING) {
                return;
            }

            if (isApproved) {
                return dispatch({ type: 'approveReceipt' });
            }

            dispatch({ type: 'approveSending' });

            const hash = await approve();

            await viemClient.waitForTransactionReceipt({ hash });

            dispatch({ type: 'approveReceipt' });
        } catch (error) {
            dispatch({
                type: 'approveError',
                errorMessage: walletErrorToUserReadableMessage(error)
            });
            logError(error);
        }
    }, [state.approveState.status, isApproved, dispatch, approve]);

    // Confirm transaction
    const handleConfirm = useCallback(async () => {
        try {
            if (state.confirmState.status === LoadingStatus.LOADING) {
                return;
            }

            dispatch({ type: 'confirmSending' });

            const { hash } = await onConfirm();

            dispatch({ type: 'confirmSent' });
            onConfirmSent(hash);
        } catch (error) {
            dispatch({
                type: 'confirmError',
                errorMessage: walletErrorToUserReadableMessage(error)
            });
            logError(error);
        }
    }, [state.confirmState.status, dispatch, onConfirm, onConfirmSent]);

    return {
        state,
        isPreparing,
        handleApprove,
        handleConfirm
    };
}