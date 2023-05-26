import { useEffect, useState } from 'react';
import { AuctionBorder } from '../АuctionBorder/AuctionBorder';
import { Button } from '@/uikit';
import { Auction } from '@/states/types';
import { CONTRACTS } from '@/config/constants/contracts';
import { useTokenAmountPrice } from '@/hooks/useTokenAmountPrice';
import { activeChainId } from '@/config/chain';
import styles from './AuctionAction.module.scss';

type AuctionActionProps = {
    auction: Auction
}


function formattingTime(targetDate: number): string {
    const targetDateFormat = new Date(targetDate);

    const timeDiff = targetDateFormat.getTime();

    if (timeDiff <= 0) {
        return '0d 0h 0m 0s';
    }

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const remainingSeconds = seconds % 60;
    const remainingMinutes = minutes % 60;
    const remainingHours = hours % 24;

    const formattedTime = `${days}d ${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s`;
    return formattedTime;
}


export function AuctionAction({ auction }: AuctionActionProps) {
    const { endDate, highestBid } = auction;

    const price = useTokenAmountPrice(highestBid.amount, CONTRACTS.usdt[activeChainId].address, highestBid.currency);

    const endDateFormat = new Date(endDate);

    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(calculateRemainingTime(endDateFormat));
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [endDate]);

    function calculateRemainingTime(endDateFormat: Date) {
        const now = new Date();
        const timeDiff = endDateFormat.getTime() - now.getTime();

        if (timeDiff <= 0) {
            return 0;
        }

        return timeDiff;
    }

    return (
        <AuctionBorder>
            <div className={styles.currentInfo}>
                <div className={styles.currentSubtitle}>Current bid:</div>
                <div className={styles.currentTitle}>{highestBid.amount} {highestBid.currency}</div>
                <div className={styles.currentPrice}>{price} USD</div>
            </div>

            <Button block>Place a bid</Button>

            <div className={styles.currentTime}>
                Sale ends in <span className={styles.white}>{formattingTime(remainingTime)}</span>
            </div>
        </AuctionBorder>
    );
}