import { useMemo } from 'react';
import { Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { ConnectTelegramButton } from '@/components/Wallet';
import { ConnectButton } from './ConnectButton';
import { sortWallets } from '@/utils/sortWallets';
import { useTranslation } from '@/localization';
import { ConnectorNames, WalletConfig } from '@/config/wallet';
import styles from './ConnectWalletModal.module.scss';

type ConnectWalletModalProps = {
    wallets: WalletConfig[],
    login: (connectorId: ConnectorNames) => Promise<any>
}

export function ConnectWalletModal({ wallets, isOpen, login, onClose }: ConnectWalletModalProps & ModalProps) {
    const { t } = useTranslation();
    const sortedWallets = useMemo(() => sortWallets(wallets), [wallets]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalHead title={t('Login to Tanpin')} />

            <ModalBody>
                <div className={styles.wrap}>
                    <div className={styles.groups}>
                        <div className={styles.group}>
                            <div className={styles.label}>
                                {t('Messengers')}
                            </div>
                            <div className={styles.list}>
                                <ConnectTelegramButton />
                            </div>
                        </div>

                        <div className={styles.group}>
                            <div className={styles.label}>
                                {t('Wallets')}
                            </div>
                            <div className={styles.list}>
                                {sortedWallets.map(wallet => <ConnectButton
                                    key={wallet.id}
                                    wallet={wallet}
                                    onConnect={() => login(wallet.connectorId)}
                                />)}
                            </div>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
}