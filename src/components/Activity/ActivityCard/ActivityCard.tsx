import { memo } from 'react';
import { Image, ImageSkeleton, Link, Skeleton, UnstyleLink } from '@/uikit';
import { AuctionAction } from './Auction/AuctionAction';
import { ActivityDescription } from './Description/ActivityDescription';
import { ActivityTransaction } from '@/states/activity/types';
import { formatDate } from '@/utils/date';
import { getTransactionExplorerURL } from '@/utils/explorer';
import classNames from 'classnames';
import styles from './ActivityCard.module.scss';

type ActivityCardProps = {
    activity: ActivityTransaction
}

export const ActivityCard = memo(({ activity }: ActivityCardProps) => {
    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <div className={styles.imageWrap}>
                    <Image
                        className={styles.image}
                        src={activity.nftImage}
                        alt=''
                        loading='lazy'
                        pending={<ImageSkeleton className={styles.imageSkeleton} />}
                    />
                </div>

                <div className={styles.info}>
                    <div className={styles.title}>{activity.nftName}</div>

                    <div className={styles.details}>
                        <div className={styles.description}>
                            <ActivityDescription activity={activity} />
                        </div>

                        <div className={styles.dateWrap}>
                            <UnstyleLink
                                href={getTransactionExplorerURL(activity.transactionHash)}
                                rel='noreferrer noopener'
                                target='_blank'
                                className={styles.date}
                            >
                                {formatDate(activity.date)}
                                <Link />
                            </UnstyleLink>
                        </div>
                    </div>
                </div>
            </div>

            {activity.auctionID && !activity.doneAuctionAction && <div className={styles.buttonWrap}>
                <AuctionAction
                    auctionID={activity.auctionID}
                    activityID={activity.ID}
                    activityType={activity.type}
                />
            </div>}
        </div>
    );
});

ActivityCard.displayName = 'ActivityCard';

export function ActivityCardSkeleton() {
    return (
        <div className={classNames(styles.card, styles.skeleton)}>
            <div className={styles.content}>
                <div className={styles.imageWrap}>
                    <ImageSkeleton className={styles.imageSkeleton} />
                </div>

                <div className={styles.info}>
                    <Skeleton className={styles.titleSkeleton} />

                    <div className={styles.details}>
                        <Skeleton className={styles.descriptionSkeleton} />
                        <Skeleton className={styles.dateSkeleton} />
                    </div>
                </div>
            </div>
        </div>
    );
}