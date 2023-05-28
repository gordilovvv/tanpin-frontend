import { NFT } from '@/states/types';
import styles from './AuctionSale.module.scss';
import { ActionBox } from '../Box/ActionBox';
import { ActionTitle } from '../Title/ActionTitle';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import { USDPrice } from '../USDPrice/USDPrice';
import { Button } from '@/uikit';
import { AuctionCountdown } from './Countdown/AuctionCountdown';

type AuctionSaleProps = {
    nft: NFT
}

export function AuctionSale({ nft }: AuctionSaleProps) {
    const handleBidPlace = () => {
        console.log('place bid');
    };

    return (
        <ActionBox>
            <div className={styles.top}>
                <div className={styles.label}>
                    Current bid:
                </div>

                <ActionTitle>
                    {formatTokenAmount(nft.auction!.highestBid.amount)} {nft.auction!.highestBid.currency}
                </ActionTitle>

                <USDPrice
                    tokenAmount={nft.auction!.highestBid.amount}
                    tokenSymbol={nft.auction!.highestBid.currency}
                />
            </div>

            <Button onClick={handleBidPlace}>
                Place a bid
            </Button>

            <AuctionCountdown auction={nft.auction!} />
        </ActionBox>
    );
}