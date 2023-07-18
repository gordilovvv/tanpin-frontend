import { Gift } from '@/uikit';
import { formatTokenAmount } from '@/utils/formatTokenAmount';
import styles from './MaticBonus.module.scss';

type MaticBonusProps = {
    amount?: string
}

export function MaticBonus({ amount }: MaticBonusProps) {
    return (
        <div className={styles.maticBonus}>
            <div className={styles.maticBonusIcon}>
                <Gift />
            </div>

            {amount
                ? <div className={styles.maticBonusText}>
                    You will also receive <span>{formatTokenAmount(amount)} MATIC</span> to pay for gas
                </div>
                : <div className={styles.maticBonusText}>
                    You will also receive <span>free</span> MATIC for gas!
                </div>}
        </div>
    );
}