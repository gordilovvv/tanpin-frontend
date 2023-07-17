import { ActivityMint } from './ActivityMint';
import { ActivityTransfer } from './ActivityTransfer';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import { ActivityTransaction, ActivityType } from '@/states/activity/types';
import styles from './ActivityDescription.module.scss';

type ActivityDescriptionProps = {
    activity: ActivityTransaction
}

export function ActivityDescription({ activity }: ActivityDescriptionProps) {
    const renderTokenAmount = (amount: string, currency: string) => {
        return <span>{formatTokenAmount(amount)} {currency}</span>;
    };

    if (activity.type === ActivityType.MINT) {
        return (<div className={styles.wrap}>
            <ActivityMint transactionOwner={activity.owner} />
        </div>);
    }

    if (activity.type === ActivityType.TRANSFER) {
        return (<div className={styles.wrap}>
            <ActivityTransfer transactionOwner={activity.owner} />
        </div>);
    }

    if (activity.type === ActivityType.LISTED && activity.price) {
        return (<>Listed for sale for {renderTokenAmount(activity.price.amount, activity.price.currency)}</>);
    }

    if (activity.type === ActivityType.UNLISTED) {
        return (<>Unlisted from sale</>);
    }

    if (activity.type === ActivityType.BUY && activity.price) {
        return (<>Purchased for {renderTokenAmount(activity.price.amount, activity.price.currency)}</>);
    }

    if (activity.type === ActivityType.SALE && activity.price) {
        return (<>Sold for {renderTokenAmount(activity.price.amount, activity.price.currency)}</>);
    }

    if (activity.type === ActivityType.CREATE_AUCTION) {
        return (<>Auction started</>);
    }

    if (activity.type === ActivityType.BID && activity.price) {
        return (<>You’ve bid {renderTokenAmount(activity.price.amount, activity.price.currency)}</>);
    }

    if (activity.type === ActivityType.WON_AUCTION && activity.price) {
        return (<>Auction won for {renderTokenAmount(activity.price.amount, activity.price.currency)}</>);
    }

    if (activity.type === ActivityType.LOST_AUCTION) {
        return (<>Auction lost</>);
    }

    if (activity.type === ActivityType.CLOSE_AUCTION && activity.price) {
        return (<>Received {renderTokenAmount(activity.price.amount, activity.price.currency)} for finished auction</>);
    }

    return <>Unknown transaction: <span>{activity.type}</span></>;
}