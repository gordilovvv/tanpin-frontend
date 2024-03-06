import useSWRImmutable from 'swr/immutable';
import { gateApi } from '@/app/api';

export type InvoiceCurrency = {
    id: string,
    chain: string,
    symbol: string,
    decimals: number
}

export type Invoice = {
    orderId: string;
    chain: string;
    amount: string;
    currency: InvoiceCurrency;
    expiresTimestamp: number;
    status: 'pending' | 'waitingConfirmations' | 'success' | 'expired';
    walletAddress: string;
};

/**
 * @example
 * null - loading
 * undefined - error
 */
export function useInvoice(invoiceId: string) {
    const { data, error, isLoading } = useSWRImmutable(
        [`invoice:${invoiceId}`],
        async () => {
            const { data } = await gateApi.get<Invoice>(`/invoice?id=${invoiceId}`);

            return data;
        },
        {
            refreshInterval: 5_000,
            dedupingInterval: 5_000
        }
    );

    return {
        invoice: data,
        isLoading,
        error
    };
}