import { Link } from 'react-router-dom';
import { Skeleton } from '@/uikit';
import { CollectionLogo } from '@/components/Collections';
import { ComboboxItem } from '@ariakit/react';
import styles from './SearchItem.module.scss';

type SearchItemProps = {
    href: string,
    name: string
    image: string
}

export function SearchItem({ href, name, image }: SearchItemProps) {
    return (
        <ComboboxItem
            as={Link}
            to={href}
            hideOnClick
            className={styles.item}
        >
            <div className={styles.wrap}>
                <CollectionLogo
                    size='xxs'
                    image={image}
                />

                <div className={styles.name}>
                    {name}
                </div>
            </div>
        </ComboboxItem>
    );
}

type SearchItemPlaceholderProps = {
    index?: number
}

export function SearchItemPlaceholder({ index = 0 }: SearchItemPlaceholderProps) {
    const textSkeletonWidth = [160, 100, 140, 200][index];

    return (
        <div className={styles.itemPlaceholder}>
            <Skeleton className={styles.imagePlaceholder} />

            <Skeleton
                className={styles.textPlaceholder}
                style={{ width: `${textSkeletonWidth}px` }}
            />
        </div>
    );
}