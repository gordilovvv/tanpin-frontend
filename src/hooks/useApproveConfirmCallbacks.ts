import { useCallback, useReducer } from 'react';
import { Hash } from 'viem';
import { SendTransactionResult } from 'wagmi/actions';
import { viemClient } from '@/config/viem';
import { useTranslation } from '@/localization';
import { logError } from '@/utils/sentry';
import { walletErrorToUserReadableMessage } from '@/utils/walletErrorToUserReadableMessage';

export enum LoadingStatus {
    IDLE = 'IDLE',
    LOADING = 'loading',
    SUCCESS = 'success',
    FAIL = 'fail'
}

export type ApproveConfirmState = {
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
    type: 'approveSending' | 'approveReceipt' | 'confirmSending' | 'confirmSent' | 'approveConfirmReset'
} | {
    type: 'approveError' | 'confirmError'
    errorMessage: string
}

const initialState: ApproveConfirmState = {
    approveState: {
        error: undefined,
        status: LoadingStatus.IDLE
    },
    confirmState: {
        error: undefined,
        status: LoadingStatus.IDLE
    }
};

function reducer(state: ApproveConfirmState, actions: Action): ApproveConfirmState {
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
        case 'approveConfirmReset': {
            return initialState;
        }
        default:
            return state;
    }
}

export function useApproveConfirmCallbacks({
    isApproved,
    onCheckApproved,
    onApprove,
    onConfirm,
    onConfirmSent
}: {
    isApproved?: boolean,
    onCheckApproved?: () => Promise<boolean>,
    onApprove: () => Promise<SendTransactionResult>,
    onConfirm: () => Promise<SendTransactionResult>
    onConfirmSent: (hash: Hash) => void
}) {
    const { t } = useTranslation();
    const [state, dispatch] = useReducer(reducer, initialState);

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

            if (onCheckApproved) {
                const isApprovedTokens = await onCheckApproved();

                if (isApprovedTokens) {
                    return dispatch({ type: 'approveReceipt' });
                }
            }

            const { hash } = await onApprove();

            await viemClient.waitForTransactionReceipt({ hash });

            dispatch({ type: 'approveReceipt' });
        } catch (error) {
            dispatch({
                type: 'approveError',
                errorMessage: walletErrorToUserReadableMessage(error, t)
            });
            logError(error);
        }
    }, [state.approveState.status, isApproved, onApprove, onCheckApproved, dispatch, t]);

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
                errorMessage: walletErrorToUserReadableMessage(error, t)
            });
            logError(error);
        }
    }, [state.confirmState.status, dispatch, onConfirm, onConfirmSent, t]);

    const handleApproveConfirmReset = useCallback(() => {
        dispatch({ type: 'approveConfirmReset' });
    }, [dispatch]);

    return {
        state,
        handleApprove,
        handleConfirm,
        handleApproveConfirmReset
    };
}