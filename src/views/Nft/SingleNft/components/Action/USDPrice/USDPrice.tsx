import { Skeleton } from '@/uikit';
import { CONTRACTS } from '@/config/constants/contracts';
import { activeChainId } from '@/config/chain';
import { useTokenAmountPrice } from '@/hooks/useTokenAmountPrice';
import { formatFiatCurrency } from '@/utils/fiat';
import { fiatCurrencies } from '@/config/constants/fiatCurrencies';
import styles from './USDPrice.module.scss';

type USDPriceProps = {
    tokenAmount: string,
    tokenSymbol: string
}

export function USDPrice({ tokenAmount, tokenSymbol }: USDPriceProps) {
    const price = useTokenAmountPrice(tokenAmount, CONTRACTS['usdt'][activeChainId].address, tokenSymbol);

    if (!price) {
        return (<div className={styles.wrap}>
            <Skeleton className={styles.loader} />
        </div>);
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.price}>
                {/* TODO: locale */}
                {formatFiatCurrency(price, fiatCurrencies.rub.locale, fiatCurrencies.usd.code)}
            </div>
        </div>
    );
}