import { ActionBox } from '../Box/ActionBox';
import { ActionTitle } from '../Title/ActionTitle';
import styles from './NotForSale.module.scss';

export function NotForSale() {
    return (
        <ActionBox>
            <div className={styles.top}>
                <div className={styles.label}>
                    Price:
                </div>

                <ActionTitle>
                    Not for sale
                </ActionTitle>
            </div>
        </ActionBox>
    );
}