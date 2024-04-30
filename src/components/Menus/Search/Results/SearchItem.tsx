import { Link } from 'react-router-dom';
import { CollectionLogo } from '@/components/Collections';
import { ComboboxItem } from '@ariakit/react';
import styles from './SearchItem.module.scss';

type SearchItemProps = {
    href: string
    name: string
    image: string
    onClick?: () => void
}

export function SearchItem({ href, name, image, onClick }: SearchItemProps) {
    return (
        <ComboboxItem
            as={Link}
            to={href}
            hideOnClick
            className={styles.item}
            onClick={onClick}
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