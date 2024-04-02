import { Button } from '@/uikit';
import { AuctionCountdown } from './Countdown/AuctionCountdown';
import { ActionBox, ActionTitle, USDPrice } from '../Common';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import { NFT, Auction } from '@/states/types';
import styles from './AuctionSale.module.scss';

type AuctionSaleProps = {
    nft: NFT,
    auction: Auction
}

// TODO: Аукцион
export function AuctionSale({ nft, auction }: AuctionSaleProps) {
    const handleBidPlace = () => {
        console.log('place bid', nft.ID);
    };

    return (
        <ActionBox>
            <div className={styles.top}>
                <div className={styles.label}>
                    Current bid:
                </div>

                <ActionTitle>
                    {formatTokenAmount(auction.highestBid.amount)} {auction.highestBid.currency}
                </ActionTitle>

                <USDPrice
                    amount={auction.highestBid.amount}
                    currency={auction.highestBid.currency}
                />
            </div>

            <Button onClick={handleBidPlace}>
                Place a bid
            </Button>

            <AuctionCountdown auction={auction} />
        </ActionBox>
    );
}