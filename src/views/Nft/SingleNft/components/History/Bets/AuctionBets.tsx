import { AuctionBet, TransactionRowSkeleton } from '@/components/Transaction';
import { useAuctionBets } from '@/states/nft/hooks/useAuctionBets';
import times from 'lodash/times';
import styles from './AuctionBets.module.scss';

const SKELETONS_COUNT = 5;

type AuctionBetsProps = {
    tokenID: string
}

export function AuctionBets({ tokenID }: AuctionBetsProps) {
    const { bets, isLoading } = useAuctionBets(tokenID);

    if (isLoading || !bets) {
        return (
            <div className={styles.wrapper}>
                {times(SKELETONS_COUNT).map(
                    (index) => <TransactionRowSkeleton key={index} />
                )}
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            {
                bets.map((bet) => {
                    return (
                        <AuctionBet
                            bet={bet}
                            key={bet.transactionHash}
                        />
                    );
                })
            }
        </div>
    );
}