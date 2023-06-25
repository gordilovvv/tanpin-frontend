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

    // TODO: add auction descriptions

    return <>Unknown transaction: <span>{activity.type}</span></>;
}