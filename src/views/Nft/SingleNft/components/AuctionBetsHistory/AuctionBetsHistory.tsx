import { useBetsQuery } from '@/states/nft/hooks/useBetsQuery';
import { AuctionBet } from '@/components/Transaction/AuctionBet/AuctionBet';
import styles from './AuctionBetsHistory.module.scss';
import { TransitionRowSkeleton } from '@/components/Transaction/TransitionRowSkeleton/TransitionRowSkeleton';
import times from 'lodash/times';

type AuctionBetsHistoryProps = {
    id: string
}

export function AuctionBetsHistory({ id }: AuctionBetsHistoryProps) {
    const { bets, isLoading } = useBetsQuery(id);

    return (
        <>
            {
                isLoading
                    ? <div
                        className={styles.wrapper
                        }
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
                            bets!.map((bet, idx) => {
                                return (
                                    <AuctionBet
                                        bet={bet}
                                        key={idx}
                                    />
                                );
                            })
                        }
                    </div>
            }
        </>
    );
}