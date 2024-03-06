import { CopyButton } from './CopyButton';
import { InvoiceProgress } from './InvoiceProgress';
import { CurrencyChain } from '../../components/CurrencyChain';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from '@/localization';
import styles from './InvoiceDetails.module.scss';

type InvoiceDetailsProps = {
    walletAddress: string,
    walletChain: string,
    currencySymbol: string,
    expiresTimestamp: number
}

export function InvoiceDetails({ walletAddress, walletChain, currencySymbol, expiresTimestamp }: InvoiceDetailsProps) {
    const { t } = useTranslation();

    return (
        <div className={styles.box}>
            <div className={styles.grid}>
                <div className={styles.qr}>
                    <QRCodeSVG
                        value={walletAddress}
                        width='100%'
                        height='100%'
                    />
                </div>

                <div className={styles.content}>
                    <div className={styles.stack}>
                        <div className={styles.label}>
                            {t('Send %currency% to', { currency: currencySymbol })}:
                        </div>

                        <div className={styles.address}>
                            <div className={styles.addressValue}>
                                {walletAddress}
                            </div>

                            <CopyButton
                                value={walletAddress}
                                toastText={t('Wallet address copied')}
                                className={styles.addressCopy}
                            />
                        </div>
                    </div>

                    <div className={styles.stack}>
                        <div className={styles.label}>
                            {t('Network')}
                        </div>

                        <div className={styles.network}>
                            {<CurrencyChain
                                chain={walletChain}
                                full
                            />}
                        </div>
                    </div>
                </div>
            </div>

            <InvoiceProgress expiresTimestamp={expiresTimestamp} />
        </div>
    );
}