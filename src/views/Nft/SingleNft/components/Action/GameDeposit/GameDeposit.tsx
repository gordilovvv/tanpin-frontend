import { Button } from '@/uikit';
import { ActionBox } from '../Box/ActionBox';
import styles from './GameDeposit.module.scss';

export function GameDeposit() {
    return (
        <ActionBox view='nftgta'>
            <div className={styles.description}>
                Transfer money to your account in NFTGTA
            </div>

            <Button view='nftgta'>
                Available after 23:30 MSK
            </Button>
        </ActionBox>
    );
}