import { ActionBox } from '../Box/ActionBox';
import { ActionTitle } from '../Title/ActionTitle';
import { useTranslation } from '@/localization';
import styles from './NotForSale.module.scss';

export function NotForSale() {
    const { t } = useTranslation();

    return (
        <ActionBox>
            <div className={styles.top}>
                <div className={styles.label}>
                    {t('Price')}
                </div>

                <ActionTitle>
                    {t('Not for sale')}
                </ActionTitle>
            </div>
        </ActionBox>
    );
}