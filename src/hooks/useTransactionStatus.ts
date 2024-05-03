import useSWRImmutable from 'swr/immutable';
import { api } from '@/app/api';
import { Hash } from 'viem';
import { useState } from 'react';
import { logError } from '@/utils/sentry';
import { TRANSACTION_STATUS_MAX_TRIES, TRANSACTION_STATUS_REFRESH_INTERVAL } from '@/config/constants';

export enum TransactionStatus {
    PENDING = 'pending',
    FAIL = 'fail',
    SUCCESS = 'success'
}

enum TransactionBackendStatus {
    PENDING = 'PENDING',
    UNKNOWN = 'UNKNOWN',
    CONFIRMED = 'CONFIRMED'
}

export function useTransactionStatus(hash: Hash) {
    const [retryCount, setRetryCount] = useState(0);
    const { data } = useSWRImmutable(['transaction.status', hash], async () => {
        try {
            const res = await api.get<{ status: TransactionBackendStatus }>(`/common/tx-status/${hash}`);

            if (res.data.status === TransactionBackendStatus.UNKNOWN) {
                setRetryCount(count => count + 1);
            }

            return res.data;
        } catch (err) {
            logError(err);
            setRetryCount(count => count + 1);
            throw err;
        }
    }, {
        refreshInterval: TRANSACTION_STATUS_REFRESH_INTERVAL,
        refreshWhenHidden: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        errorRetryCount: 5,
        errorRetryInterval: 2_000,
    });

    let status: TransactionStatus;

    if (!data || data.status === TransactionBackendStatus.UNKNOWN) {
        if (retryCount <= TRANSACTION_STATUS_MAX_TRIES) {
            status = TransactionStatus.PENDING;
        } else {
            status = TransactionStatus.FAIL;
        }
    } else if (data.status === TransactionBackendStatus.PENDING) {
        status = TransactionStatus.PENDING;
    } else if (data.status === TransactionBackendStatus.CONFIRMED) {
        status = TransactionStatus.SUCCESS;
    } else {
        status = TransactionStatus.FAIL;
    }

    return status;
}