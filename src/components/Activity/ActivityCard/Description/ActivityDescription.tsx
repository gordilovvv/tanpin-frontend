import { ActivityMint } from './ActivityMint';
import { ActivityTransfer } from './ActivityTransfer';
import { useTranslation } from '@/localization';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import { ActivityTransaction, ActivityType } from '@/states/activity/types';
import styles from './ActivityDescription.module.scss';

type ActivityDescriptionProps = {
    activity: ActivityTransaction
}

export function ActivityDescription({ activity }: ActivityDescriptionProps) {
    const { t } = useTranslation();
    const renderTokenAmount = (amount: string, currency: string) => {
        return <span>{formatTokenAmount(amount)} {currency}</span>;
    };

    if (activity.type === ActivityType.MINT) {
        return (<div className={styles.wrap}>
            <ActivityMint transactionOwner={activity.owner} />
        </div>);
    }

    if (activity.type === ActivityType.TRANSFER && activity.transferedTo) {
        return (<div className={styles.wrap}>
            <ActivityTransfer recipient={activity.transferedTo} />
        </div>);
    }

    if (activity.type === ActivityType.LISTED && activity.price) {
        return (<>{t('Listed for sale for')} {renderTokenAmount(activity.price.amount, activity.price.currency)}</>);
    }

    if (activity.type === ActivityType.UNLISTED) {
        return (<>{t('Unlisted from sale')}</>);
    }

    if (activity.type === ActivityType.BUY && activity.price) {
        return (<>{t('Purchased for')} {renderTokenAmount(activity.price.amount, activity.price.currency)}</>);
    }

    if (activity.type === ActivityType.SALE && activity.price) {
        return (<>{t('Sold for')} {renderTokenAmount(activity.price.amount, activity.price.currency)}</>);
    }

    if (activity.type === ActivityType.CREATE_AUCTION) {
        return (<>{t('Auction started')}</>);
    }

    if (activity.type === ActivityType.BID && activity.price) {
        return (<>{t('You’ve bid')} {renderTokenAmount(activity.price.amount, activity.price.currency)}</>);
    }

    if (activity.type === ActivityType.WON_AUCTION && activity.price) {
        return (<>{t('Auction won for')} {renderTokenAmount(activity.price.amount, activity.price.currency)}</>);
    }

    if (activity.type === ActivityType.LOST_AUCTION) {
        return (<>{t('Auction lost')}</>);
    }

    if (activity.type === ActivityType.CLOSE_AUCTION && activity.price) {
        return (<>{t('Received')} {renderTokenAmount(activity.price.amount, activity.price.currency)} for finished auction</>);
    }

    return <>{t('Unknown transaction:')} <span>{activity.type}</span></>;
}