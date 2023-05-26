import { AuctionBorder } from '../АuctionBorder/AuctionBorder';
import { Button, Cart } from '@/uikit';
import styles from './InstantBuy.module.scss';
import { activeChainId } from '@/config/chain';
import { CONTRACTS } from '@/config/constants/contracts';
import { useTokenAmountPrice } from '@/hooks/useTokenAmountPrice';


type InstantBuyProps = {
    price: {
        currency: string
        amount: string
    }
}

export function InstantBuy({ price }: InstantBuyProps) {
    const { amount, currency } = price;

    const priceUSD = useTokenAmountPrice(amount, CONTRACTS.usdt[activeChainId].address, currency);
    return (
        <AuctionBorder>
            <div className={styles.header}>
                <div className={styles.title}>{amount} {currency}</div>
                <div className={styles.subtitle}>{priceUSD} USD</div>
            </div>

            <Button iconSlot={<Cart />}>Buy now</Button>
        </AuctionBorder>
    );
}