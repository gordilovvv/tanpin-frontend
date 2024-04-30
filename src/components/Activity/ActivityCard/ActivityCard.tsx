import { memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Image, ImageSkeleton, Link, Skeleton, UnstyleLink } from '@/uikit';
import { ActivityDescription } from './Description/ActivityDescription';
import { ActivityTransaction } from '@/states/activity/types';
import { useTranslation } from '@/localization';
import { formatDate } from '@/utils/date';
import { getTransactionExplorerURL } from '@/utils/explorer';
import classNames from 'classnames';
import styles from './ActivityCard.module.scss';

type ActivityCardProps = {
    activity: ActivityTransaction
}

export const ActivityCard = memo(({ activity }: ActivityCardProps) => {
    const { locale } = useTranslation();

    return (
        <RouterLink
            className={styles.card}
            to={`/${activity.contractAddress}/${activity.tokenId}`}
        >
            <div className={styles.content}>
                <div className={styles.imageWrap}>
                    <Image
                        className={styles.image}
                        src={activity.tokenImageUrl}
                        alt=''
                        loading='lazy'
                        pending={<ImageSkeleton className={styles.imageSkeleton} />}
                    />
                </div>

                <div className={styles.info}>
                    <div className={styles.title}>{activity.tokenName}</div>

                    <div className={styles.details}>
                        <div className={styles.description}>
                            <ActivityDescription activity={activity} />
                        </div>

                        <div className={styles.dateWrap}>
                            <UnstyleLink
                                href={getTransactionExplorerURL(activity.hash)}
                                rel='noreferrer noopener'
                                target='_blank'
                                className={styles.date}
                                onClick={event => event.stopPropagation()}
                            >
                                {formatDate(activity.createdAt, locale)}
                                <Link />
                            </UnstyleLink>
                        </div>
                    </div>
                </div>
            </div>
        </RouterLink>
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