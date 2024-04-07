import { useState } from 'react';
import { Cat, Modal, ModalBody, ModalProps, UnstyleLink } from '@/uikit';
import { ErrorMessageModal } from '..';
import { useTranslation } from '@/localization';
// import { useRulesAccept } from '@/states/user/hooks/useRulesAccept';
import { POLICY_URL, TERMS_URL } from '@/config';
import backgroundImage from '@/app/assets/images/background.png';
import styles from './WelcomeModal.module.scss';

/**
 * @deprecated
 */
export function WelcomeModal({ isOpen }: ModalProps) {
    const { t } = useTranslation();
    const [acceptError, setAcceptError] = useState<string | undefined>();
    // const { acceptRules } = useRulesAccept();

    return (
        <>
            <Modal isOpen={isOpen}>
                <ModalBody
                    className={styles.body}
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                    <div className={styles.wrap}>
                        <div className={styles.image}>
                            <Cat />
                        </div>

                        <div className={styles.title}>
                            {t('Welcome to Tanpin')}
                        </div>

                        <div className={styles.text}>
                            {t('By continuing you agree with our')}<br />

                            <UnstyleLink
                                href={TERMS_URL}
                                target='_blank'
                            // eslint-disable-next-line react/jsx-newline
                            >{t('Terms of Service')}</UnstyleLink> {t('and')} <UnstyleLink
                                href={POLICY_URL}
                                target='_blank'
                            >{t('Privacy Policy')}</UnstyleLink>
                        </div>

                        {/* <Button
                            view='secondary'
                            onClick={acceptRules}
                        >
                            {t('Start Exploring')}
                        </Button> */}
                    </div>
                </ModalBody>
            </Modal>

            <ErrorMessageModal
                isOpen={!!acceptError}
                error={acceptError}
                onClose={() => setAcceptError(undefined)}
            />
        </>
    );
}