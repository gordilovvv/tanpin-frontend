import { ActionBox } from '../Box/ActionBox';
import { TransferButton } from '@/components/Nft/Buttons/TransferButton';
import styles from './GameDeposit.module.scss';

type GameDepositProps = {
    nftID: string,
    tokenID: string,
    editionsAvailable: number
}

export function GameDeposit({ nftID, tokenID, editionsAvailable }: GameDepositProps) {
    return (
        <ActionBox view='nftgta'>
            <div className={styles.description}>
                Send money to the NFTGTA<br /> to top up your game's account.
            </div>

            <TransferButton
                nftID={nftID}
                tokenID={tokenID}
                editionsAvailable={editionsAvailable}
            />
        </ActionBox>
    );
}