import { useState } from 'react';
import { Button, Cat, Modal, ModalBody, ModalProps, UnstyleLink } from '@/uikit';
import { ErrorMessageModal } from '..';
import { useRulesAccept } from '@/states/user/hooks/useRulesAccept';
import { POLICY_URL, TERMS_URL } from '@/config';
import backgroundImage from '@/app/assets/images/background.png';
import styles from './WelcomeModal.module.scss';

export function WelcomeModal({ isOpen }: ModalProps) {
    const [acceptError, setAcceptError] = useState<string | undefined>();
    const { acceptRules, isLoading } = useRulesAccept();

    const handleAcceptRules = async () => {
        try {
            await acceptRules();
        } catch (error) {
            console.error(error);
            setAcceptError((error as Error).message);
        }
    };

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
                            Welcome to Tanpin
                        </div>

                        <div className={styles.text}>
                            By continuing you agree with our<br />

                            <UnstyleLink
                                href={TERMS_URL}
                                target='_blank'
                            // eslint-disable-next-line react/jsx-newline
                            >Terms of Service</UnstyleLink> and <UnstyleLink
                                href={POLICY_URL}
                                target='_blank'
                            >Privacy Policy</UnstyleLink>
                        </div>

                        <Button
                            view='secondary'
                            loading={isLoading}
                            onClick={handleAcceptRules}
                        >
                            Start Exploring
                        </Button>
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