import { CountdownCalculation } from '@/components/Countdown';
import { CountdownLayout } from './CountdownLayout';
import { Auction, AuctionStatus } from '@/states/types';
import styles from './AuctionCountdown.module.scss';

type AuctionStatusProps = {
    auction: Auction
}

export function AuctionCountdown({ auction }: AuctionStatusProps) {
    if (auction.status === AuctionStatus.NOT_STARTED) {
        return (<div className={styles.wrap}>
            <div className={styles.label}>Sale starts in</div>

            <CountdownCalculation date={auction.startDate}>
                {(countdown) => <CountdownLayout countdown={countdown} />}
            </CountdownCalculation>
        </div>);
    }

    if (auction.status === AuctionStatus.STARTED) {
        return (
            <div className={styles.wrap}>
                <div className={styles.label}>Sale ends in</div>

                <CountdownCalculation date={auction.endDate}>
                    {(countdown) => <CountdownLayout countdown={countdown} />}
                </CountdownCalculation>
            </div>
        );
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.ended}>This sale has ended</div>
        </div>
    );
}