import { useBetsQuery } from '@/states/nft/hooks/useBetsQuery';
import { AuctionBet } from '@/components/Transaction';
import { TransitionRowSkeleton } from '@/components/Transaction';
import times from 'lodash/times';
import styles from './AuctionBetsHistory.module.scss';

type AuctionBetsHistoryProps = {
    id: string
}

export function AuctionBetsHistory({ id }: AuctionBetsHistoryProps) {
    const { bets, isLoading } = useBetsQuery(id);

    return (
        <>
            {
                isLoading || !bets
                    ? <div
                        className={styles.wrapper}
                    >
                        {
                            times(4).map((idx) => <TransitionRowSkeleton
                                key={idx}
                                widthType={idx}
                            />)
                        }
                    </div >
                    : <div
                        className={styles.wrapper}
                    >
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
            }
        </>
    );
}