import { BaseError, UnknownRpcError } from 'viem';
import { isUserRejected } from './isUserRejected';

/// only show corrected parsed viem error
function parseError<TError>(err: TError): BaseError | null {
    if (err instanceof BaseError) {
        return err;
    }
    if (typeof err === 'string') {
        return new UnknownRpcError(new Error(err));
    }
    if (err instanceof Error) {
        return new UnknownRpcError(err);
    }

    return null;
}

export function walletErrorToUserReadableMessage(error: any) {
    if (isUserRejected(error)) {
        return 'You rejected the transaction.';
    }

    let reason: string | undefined;
    const parsedError = parseError(error);

    if (parsedError) {
        reason = parsedError.shortMessage || parsedError.message;
    } else {
        while (error) {
            reason = error.reason ?? error.data?.message ?? error.message ?? reason;
            // eslint-disable-next-line no-param-reassign
            error = error.error ?? error.data?.originalError;
        }
    }

    if (reason?.indexOf('execution reverted: ') === 0) {
        reason = reason.substring('execution reverted: '.length);
    }

    return reason!;
}