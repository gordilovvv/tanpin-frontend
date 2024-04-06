import { Currency } from '@/components/Currency';
import { TotalRow } from './TotalRow';
import { useTranslation } from '@/localization';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import styles from './BuyReceipt.module.scss';

type BuyReceiptProps = {
    amount?: number
    price: string
    currency: string
    detailed: boolean
}

export function BuyReceipt({ amount, price, currency, detailed }: BuyReceiptProps) {
    const { t } = useTranslation();
    const total = amount ? +price * amount : undefined;

    if (!detailed) {
        return (
            <div className={styles.wrap}>
                <div className={styles.total}>
                    <div className={styles.label}>
                        {t('NFT Price')}:
                    </div>

                    <div className={styles.value}>
                        {formatTokenAmount(price)} <Currency>{currency}</Currency>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.stack}>
                <TotalRow label={t('Price')}>
                    {formatTokenAmount(price)} <Currency>{currency}</Currency>
                </TotalRow>

                <TotalRow label={t('NFTs')}>
                    {amount ? amount : '-'}
                </TotalRow>
            </div>

            <div className={styles.total}>
                <div className={styles.label}>
                    {t('Total')}:
                </div>

                <div className={styles.value}>
                    {total
                        ? <>{formatTokenAmount(total)} <Currency>{currency}</Currency></>
                        : '-'}
                </div>
            </div>
        </div>
    );
}