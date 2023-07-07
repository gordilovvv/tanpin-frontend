import { memo } from 'react';
import { Image, ImageSkeleton, Link, Skeleton, UnstyleLink } from '@/uikit';
import { ActivityDescription } from './Description/ActivityDescription';
import { ActivityTransaction } from '@/states/activity/types';
import { formatDate } from '@/utils/date';
import { getTransactionExplorerURL } from '@/utils/explorer';
import classNames from 'classnames';
import styles from './ActivityCard.module.scss';

// function ArrowIcon(props: SvgProps) {
//     return (
//         <svg
//             width="33"
//             height="32"
//             viewBox="0 0 33 32"
//             xmlns="http://www.w3.org/2000/svg"
//             {...props}
//         >
//             <path
//                 fillRule="evenodd"
//                 clipRule="evenodd"
//                 d="M12.8905 8.39052C13.4112 7.86983 14.2554 7.86983 14.7761 8.39052L21.4428 15.0572C21.9635 15.5779 21.9635 16.4221 21.4428 16.9428L14.7761 23.6095C14.2554 24.1302 13.4112 24.1302 12.8905 23.6095C12.3698 23.0888 12.3698 22.2446 12.8905 21.7239L18.6144 16L12.8905 10.2761C12.3698 9.75544 12.3698 8.91122 12.8905 8.39052Z"
//                 fill="currentColor"
//             />
//         </svg>
//     );
// }

type ActivityCardProps = {
    activity: ActivityTransaction
}

// TODO:
// 1. ДОБАВИТЬ ССЫЛКУ НА NFT ПРИ КЛИКЕ НА ЗАГОЛОВОК И КАРТИНКУ
// 2. СДЕЛАТЬ КАРТИНКУ И НАЗВАНИЕ ТОКЕНА
export const ActivityCard = memo(({ activity }: ActivityCardProps) => {
    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <div className={styles.imageWrap}>
                    <Image
                        className={styles.image}
                        src='https://lh3.googleusercontent.com/QTgdcdlXPZDNhBNiFPdEMrBuVs3p5gwvFoDqveKrKWOYQrdYa4e1jvlWJX8EnLt6alcatR5verlz6SFZNRoxo7LYtYBSoITmeA=s400'
                        alt=''
                        loading='lazy'
                        pending={<ImageSkeleton className={styles.imageSkeleton} />}
                    />
                </div>

                <div className={styles.info}>
                    <div className={styles.title}>Porsche Cayenne Coupe</div>

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