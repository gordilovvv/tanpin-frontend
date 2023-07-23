import { UnstyleLink } from '@/uikit';
import { Question } from './Questing';
import { HOW_TO_CREATE_WALLET_INSTRUCTION_URL } from '@/config/constants';
import styles from './WalletDocsButton.module.scss';

export function WalletDocsButton() {
    return (
        <UnstyleLink
            href={HOW_TO_CREATE_WALLET_INSTRUCTION_URL}
            target='_blank'
            rel='noreferrer noopener'
            className={styles.button}
        >
            <div className={styles.text}>
                Don’t have a wallet ?
            </div>

            <div className={styles.icon}>
                <Question />
            </div>
        </UnstyleLink>
    );
}