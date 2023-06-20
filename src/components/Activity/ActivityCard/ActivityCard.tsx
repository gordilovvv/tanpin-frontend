import { memo } from 'react';
import { Button, ArrowSmall } from '@/uikit';
import { Link } from 'react-router-dom';
import { Activity } from '../types';
import { formatDate } from '@/utils/date';
import { TransactionType } from '@/states/types';
import styles from './ActivityCard.module.scss';

type ActivityCardProps = {
    activity: Activity
}

export const ActivityCard = memo(({ activity }: ActivityCardProps) => {
    const { date } = activity;


    const renderContent = () => {
        /* eslint-disable indent */
        switch (activity.type) {
            case TransactionType.TRANSFER:
                return (
                    <>
                        Purchased for <span className={styles.white}>60 USDT</span>
                    </>
                );

            default:
                return (<div className={styles.white}>Unknown transaction</div>);

        }
        /* eslint-enable indent */
    };
    return (
        <Link
            to={'/'}
            className={styles.wrapper}
        >
            <div className={styles.content}>
                <div className={styles.imageWrap}>
                    <img
                        className={styles.image}
                        src={'https://croppola.com/croppola/example-bird2/image.jpg?algorithm=croppola&aspectRatio=1&width=500&thumbnailMaximumWidth=150'}
                    />
                </div>

                <div className={styles.info}>
                    <div className={styles.title}>Porsche Cayenne Coupe</div>

                    <div className={styles.transaction}>
                        <div className={styles.transactionMain}>

                            {renderContent()}

                        </div>

                        <div className={styles.transactionTime}>
                            {formatDate(date)}
                        </div>
                    </div>
                </div>
            </div>

            {/* <Button view="secondary">Claim reward</Button> */}
            <ArrowSmall className={styles.arrow} />
        </Link>
    );
});


ActivityCard.displayName = 'ActivityCard';