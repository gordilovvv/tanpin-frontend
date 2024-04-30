import { Currency } from '@/components/Currency';
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

    const renderPrice = (amount: number, price: string, currency: string) => {
        const totalPrice = amount * parseFloat(price);

        return <span>{formatTokenAmount(totalPrice)} <Currency>{currency}</Currency></span>;
    };

    if (activity.type === ActivityType.TRANSFER) {
        return (<div className={styles.wrap}>
            <ActivityTransfer recipient={activity.data.to} />
        </div>);
    }

    if (activity.type === ActivityType.CREATE_DIRECT_SALE) {
        return (<>{t('Listed for sale for')} {renderPrice(1, activity.data.price, activity.data.currency)}</>);
    }

    if (activity.type === ActivityType.CLOSE_DIRECT_SALE) {
        return (<>{t('Unlisted from sale')}</>);
    }

    if (activity.type === ActivityType.BUY_DIRECT_SALE) {
        return (<>{t('Purchased for')} {renderPrice(activity.data.amount, activity.data.price, activity.data.currency)}</>);
    }

    if (activity.type === ActivityType.SELL_DIRECT_SALE) {
        return (<>{t('Sold for')} {renderPrice(activity.data.amount, activity.data.price, activity.data.currency)}</>);
    }

    if (activity.type === ActivityType.UPDATE_DIRECT_SALE) {
        return (<>{t('Price changed for')} {renderPrice(1, activity.data.price, activity.data.currency)}</>);
    }

    return <>{t('Unknown transaction:')} <span>{activity.type}</span></>;
}