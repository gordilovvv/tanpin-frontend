import { PropsWithChildren, useEffect } from 'react';
import { TransactionStatus as TransactionStatusEnum, useTransactionStatus } from '@/hooks/useTransactionStatus';
import { Hash } from 'viem';

type StatusLoaderProps = {
    hash: Hash,
    onChange: (status: TransactionStatusEnum) => void
}

export function StatusLoader({ hash, children, onChange }: PropsWithChildren<StatusLoaderProps>) {
    const status = useTransactionStatus(hash);

    useEffect(() => {
        onChange(status);
    }, [status, onChange]);

    return (<>{children}</>);
}