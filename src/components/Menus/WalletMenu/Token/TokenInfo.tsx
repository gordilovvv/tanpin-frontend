import { Skeleton } from '@/uikit';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import styles from './TokenInfo.module.scss';

type TokenInfoProps = {
    image: string,
    balance?: string,
    symbol: string,
    loading?: boolean
}

export function TokenInfo({ image, balance, symbol, loading }: TokenInfoProps) {
    return (
        <div className={styles.token}>
            <div
                className={styles.img}
                style={{ backgroundImage: `url(${image})` }}
            />

            {loading || !balance
                ? <Skeleton className={styles.amountLoader} />
                : <div className={styles.amount}>
                    {formatTokenAmount(balance)} <span>{symbol}</span>
                </div>}
        </div>
    );
}