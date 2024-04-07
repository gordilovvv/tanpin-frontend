import { Attention, UnstyleButton } from '@/uikit';
import { CopyButton } from './CopyButton';
import { CurrencyIcon } from '@/components/Currency';
import { CurrencyChain } from '../../components/CurrencyChain';
import { useTranslation } from '@/localization';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { InvoiceCurrency } from '../hooks/useInvoice';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import styles from './InvoiceHead.module.scss';

type InvoiceHeadProps = {
    chain: string,
    amount: string
    currency: InvoiceCurrency
}

export function InvoiceHead({ chain, amount, currency }: InvoiceHeadProps) {
    const { t } = useTranslation();
    const { handleCopy } = useCopyToClipboard(amount, t('Amount copied'));

    return (
        <div className={styles.head}>
            <div className={styles.title}>
                <div className={styles.titleStack}>
                    <CurrencyIcon
                        code={currency.id}
                        size='m'
                    />

                    <div className={styles.amount}>
                        <UnstyleButton
                            className={styles.sum}
                            onClick={handleCopy}
                        >
                            {formatTokenAmount(amount)}
                        </UnstyleButton> <span>{currency.symbol} (<CurrencyChain chain={chain} />)</span>
                    </div>
                </div>

                <CopyButton
                    value={amount}
                    toastText={t('Amount copied')}
                />
            </div>


            <div className={styles.warning}>
                <div className={styles.warningIcon}>
                    <Attention />
                </div>

                <div className={styles.warningText}>
                    {t('Make sure to transfer the exact amount as above')}
                </div>
            </div>
        </div>
    );
}