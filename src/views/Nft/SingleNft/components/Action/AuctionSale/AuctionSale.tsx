import { Button } from '@/uikit';
import { ActionBox } from '../Box/ActionBox';
import { ActionTitle } from '../Title/ActionTitle';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import { USDPrice } from '../USDPrice/USDPrice';
import { AuctionCountdown } from './Countdown/AuctionCountdown';
import { NFTInStore } from '@/states/nft/types';
import { Auction } from '@/states/types';
import styles from './AuctionSale.module.scss';

type AuctionSaleProps = {
    nft: NFTInStore,
    auction: Auction
}

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
                    tokenAmount={auction.highestBid.amount}
                    tokenSymbol={auction.highestBid.currency}
                />
            </div>

            <Button onClick={handleBidPlace}>
                Place a bid
            </Button>

            <AuctionCountdown auction={auction} />
        </ActionBox>
    );
}