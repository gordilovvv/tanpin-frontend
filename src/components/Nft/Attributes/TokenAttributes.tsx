import { NFTAttribute } from '@/states/types';
import styles from './TokenAttributes.module.scss';

type TokenAttributesProps = {
    attributes: NFTAttribute[]
}

export function TokenAttributes({ attributes }: TokenAttributesProps) {
    return (
        <div className={styles.attributes}>
            {(attributes).map((attribute) =>
                <div
                    className={styles.item}
                    key={`${attribute.traitType}-${attribute.value}`}
                >
                    <div className={styles.itemTitle}>{attribute.traitType}</div>
                    <div className={styles.itemBody}>{attribute.value}</div>
                </div>)}
        </div>
    );
}