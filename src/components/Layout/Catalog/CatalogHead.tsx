import { ReactNode } from 'react';
import { Title } from '@/uikit';
import styles from './CatalogHead.module.scss';

type CatalogHeadProps = {
    title: string,
    description: string,
    addonRight?: ReactNode,
    addonBottom?: ReactNode
}

export function CatalogHead({ title, description, addonRight, addonBottom }: CatalogHeadProps) {
    return (
        <div className={styles.head}>
            <div className={styles.main}>
                <div className={styles.left}>
                    <Title className={styles.title}>
                        {title}
                    </Title>

                    <div className={styles.text}>
                        {description}
                    </div>
                </div>

                {addonRight}
            </div>

            {addonBottom}
        </div>
    );
}