import styles from './Attributes.module.scss';
import { NFTAttribute } from '@/states/types';

type AttributesProps = {
    attributes: NFTAttribute[]
}

export function Attributes({ attributes }: AttributesProps) {
    return (
        <div className={styles.attributes}>
            {(attributes).map((attribute) =>
                <div
                    className={styles.item}
                    key={attribute.value}
                >
                    <div className={styles.itemTitle}>{attribute.traitType}</div>
                    <div className={styles.itemBody}>{attribute.value}</div>
                </div>)}
        </div>
    );
}