import { useMemo } from 'react';
import { Button, Modal, ModalBody, ModalHead, ModalProps } from '@/uikit';
import { WalletButton } from '@/components/Wallet';
import { ConnectButton } from './ConnectButton';
import { sortWallets } from '@/utils/sortWallets';
import { useTranslation } from '@/localization';
import { TELEGRAM_BOT_URL } from '@/config';
import { ConnectorNames, WalletConfig } from '@/config/wallet';
import { HOW_TO_CREATE_WALLET_INSTRUCTION_URL } from '@/config/constants';
import { getReferralCode } from '@/states/deposit/hooks/useReferralCode';
import tgLogo from '@/app/assets/images/tg.png';
import styles from './ConnectWalletModal.module.scss';

type ConnectWalletModalProps = {
    wallets: WalletConfig[],
    login: (connectorId: ConnectorNames) => Promise<any>
}

export function ConnectWalletModal({ wallets, isOpen, login, onClose }: ConnectWalletModalProps & ModalProps) {
    const { t } = useTranslation();
    const sortedWallets = useMemo(() => sortWallets(wallets), [wallets]);
    const referralCode = getReferralCode();
    const telegramAuthUrl = referralCode ? `${TELEGRAM_BOT_URL}?start=r_${referralCode}` : TELEGRAM_BOT_URL;

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
                                <WalletButton
                                    as='link'
                                    href={telegramAuthUrl}
                                    icon={<img
                                        src={tgLogo}
                                        alt='tg'
                                    />}
                                    title='Telegram'
                                />
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

                    <Button
                        as='a'
                        href={HOW_TO_CREATE_WALLET_INSTRUCTION_URL}
                        rel='noreferrer noopener'
                        target='_blank'
                        view='secondary'
                    >
                        {t('I don’t have a wallet')}
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    );
}