import { Button, Question, UnstyleLink, Logo } from '@/uikit';
import styles from './AuthStage.module.scss';
import { TERMS_URL } from '@/config';

export function AuthStage() {
    return (
        <>
            <Logo className={styles.logo} />
            <div className={styles.title}>Authorize a game</div>
            <div className={styles.info}>Log in to Tanpin using your wallet to connect it with <span>NFTGTA</span> Your NFTs from the wallet will appear in the game</div>

            <div className={styles.walletWrap}>
                <div className={styles.wallet}>
                    <button
                        className={styles.notWallet}
                    >
                        Don’t have a wallet?
                        <span className={styles.icon}>
                            <Question />
                        </span>
                    </button>

                    <Button block>Connect Wallet</Button>

                </div>

                <div className={styles.terms}>
                    By proceeding you agree with our <UnstyleLink
                        href={TERMS_URL}
                        rel='noreferrer noopener'
                        target='_blank'
                        className={styles.link}
                    >Terms</UnstyleLink>
                </div>
            </div>
        </>
    );
}