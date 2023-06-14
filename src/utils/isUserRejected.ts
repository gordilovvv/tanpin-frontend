import { UnknownRpcError, UserRejectedRequestError } from 'viem';

/**
 * Checks if user rejected transaction
 */
export function isUserRejected(err): boolean {
    if (err instanceof UserRejectedRequestError) {
        return true;
    }

    if (err instanceof UnknownRpcError) {
        // Fallback for some wallets that don't follow EIP 1193, trust, safe
        if (err.details?.includes('cancel') || err.details?.includes('Transaction was rejected')) {
            return true;
        }
    }

    // Fallback for raw rpc error code
    if (typeof err === 'object') {
        if (err.message.includes('User rejected the request')) {
            return true;
        }

        if (
            ('code' in err && (err.code === 4001 || err.code === 'ACTION_REJECTED')) ||
            ('cause' in err && 'code' in err.cause && err.cause.code === 4001)
        ) {
            return true;
        }

        if ('cause' in err) {
            return isUserRejected(err.cause);
        }
    }

    return false;
}