import { Skeleton } from '@/uikit';
import { CONTRACTS } from '@/config/constants/contracts';
import { activeChainId } from '@/config/chain';
import { useTokenAmountPrice } from '@/hooks/useTokenAmountPrice';
import { formatFiatCurrency } from '@/utils/fiat';
import { fiatCurrencies } from '@/config/constants/fiatCurrencies';
import styles from './USDPrice.module.scss';

type USDPriceProps = {
    amount: string,
    currency: string
}

export function USDPrice({ amount, currency }: USDPriceProps) {
    const currencyContract = CONTRACTS[currency][activeChainId].address;
    const price = useTokenAmountPrice(amount, currencyContract, currency);

    if (price === null) {
        return (<div className={styles.wrap}>
            <Skeleton className={styles.loader} />
        </div>);
    }

    if (!price) {
        return null;
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.price}>
                {formatFiatCurrency(price, fiatCurrencies.rub.locale, fiatCurrencies.usd.code)}
            </div>
        </div>
    );
}