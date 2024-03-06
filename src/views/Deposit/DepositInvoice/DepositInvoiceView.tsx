import { BackgroundGradient, Container, PageError, PageLoader, PageWrapper } from '@/components/Layout';
import { InvoiceDetails } from './components/InvoiceDetails';
import { InvoiceHead } from './components/InvoiceHead';
import { CountdownCalculation } from '@/components/Countdown';
import { ExpiresCountdown } from './components/ExpiresCountdown';
import { Navigate, useParams } from 'react-router-dom';
import { useInvoice } from './hooks/useInvoice';
import { useTranslation } from '@/localization';
import styles from './DepositInvoiceView.module.scss';

export function DepositInvoiceView() {
    const { t } = useTranslation();
    const { invoiceID } = useParams() as { invoiceID: string };
    const { invoice, isLoading, error } = useInvoice(invoiceID);

    const isSuccess = invoice && invoice.status === 'success';
    const isExpired = invoice && (invoice.status === 'expired' || invoice.expiresTimestamp < Date.now());

    if (isLoading) {
        return (
            <>
                <BackgroundGradient />
                <PageLoader />
            </>
        );
    }

    if (!invoice || error) {
        return <>
            <BackgroundGradient />
            <PageError error={t('Unknown payment')} />
        </>;
    }

    if (isSuccess) {
        return <Navigate to='/deposit/success' />;
    }

    if (isExpired) {
        return <Navigate to='/deposit/rejected' />;
    }

    return (
        <PageWrapper hasPaddingTop={false}>
            <Container
                className={styles.container}
                maxWidth={500 + 48 * 2}
            >
                <BackgroundGradient />

                <div className={styles.wrap}>
                    <div className={styles.title}>
                        {invoice.status === 'pending'
                            ? t('Transfer pending')
                            : t('Waiting for confirmation')}
                    </div>

                    <InvoiceHead
                        chain={invoice.chain}
                        amount={invoice.amount}
                        currency={invoice.currency}
                    />

                    <div className={styles.stack}>
                        <InvoiceDetails
                            walletChain={invoice.chain}
                            walletAddress={invoice.walletAddress}
                            currencySymbol={invoice.currency.symbol}
                            expiresTimestamp={invoice.expiresTimestamp}
                        />

                        <CountdownCalculation date={invoice.expiresTimestamp}>
                            {(countdown) => <ExpiresCountdown
                                countdown={countdown}
                                end={isExpired}
                            />}
                        </CountdownCalculation>
                    </div>
                </div>
            </Container>
        </PageWrapper>
    );
}