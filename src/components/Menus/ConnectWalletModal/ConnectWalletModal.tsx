import { useMemo } from 'react';
import { Button, Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { WalletButton } from '@/components/Wallet';
import { sortWallets } from '@/utils/sortWallets';
import { ConnectorNames, WalletConfig } from '@/config/wallet';
import { HOW_TO_CREATE_WALLET_INSTRUCTION_URL } from '@/config/constants';
import styles from './ConnectWalletModal.module.scss';

type ConnectWalletModalProps = {
    wallets: WalletConfig[],
    login: (connectorId: ConnectorNames) => Promise<any>
}

export function ConnectWalletModal({ wallets, isOpen, login, onClose }: ConnectWalletModalProps & ModalProps) {
    const sortedWallets = useMemo(() => sortWallets(wallets), [wallets]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalHead title='Select your wallet' />

            <ModalBody>
                <div className={styles.wrap}>
                    <div className={styles.list}>
                        {sortedWallets.map(wallet => <WalletButton
                            key={wallet.id}
                            wallet={wallet}
                            onConnect={() => login(wallet.connectorId)}
                        />)}
                    </div>

                    <Button
                        as='a'
                        href={HOW_TO_CREATE_WALLET_INSTRUCTION_URL}
                        rel='noreferrer noopener'
                        target='_blank'
                        view='secondary'
                    >
                        I don’t have a wallet
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    );
}