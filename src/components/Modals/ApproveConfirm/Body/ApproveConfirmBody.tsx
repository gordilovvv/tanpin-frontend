import { useEffect, useState } from 'react';
import { Button } from '@/uikit';
import { TransactionStep } from '../Step/TransactionStep';
import { LoadingContent } from '../../Loading/LoadingContent';
import { ApproveConfirmState, LoadingStatus } from '@/hooks/useApproveConfirmCallbacks';
import styles from './ApproveConfirmBody.module.scss';

enum Step {
    APPROVE = 'approve',
    CONFIRM = 'confirm'
}

type ApproveConfirmBodyProps = {
    state: ApproveConfirmState,
    texts: {
        approve: { title: string, description: string },
        confirm: { title: string, description: string }
    },
    isLoading?: boolean,
    onApprove: () => Promise<void>,
    onConfirm: () => Promise<void>,
    onClose?: () => void
}

export function ApproveConfirmBody({ state, isLoading, texts, onApprove, onConfirm, onClose }: ApproveConfirmBodyProps) {
    const steps = {
        [Step.APPROVE]: onApprove,
        [Step.CONFIRM]: onConfirm
    };
    const [activeStep, setActiveStep] = useState(Step.APPROVE);

    const transactionError = state.approveState.error ?? state.confirmState.error;
    const retryTransaction = state.approveState.error
        ? onApprove
        : onConfirm;

    // Run active step on open
    useEffect(() => {
        if (!isLoading && !transactionError) {
            steps[activeStep]();
        }
    }, [isLoading, activeStep]);

    // After successful approve start confirm
    useEffect(() => {
        if (state.approveState.status === LoadingStatus.SUCCESS) {
            setActiveStep(Step.CONFIRM);
        }
    }, [state.approveState]);

    if (isLoading) {
        return (<LoadingContent />);
    }

    return (
        <div className={styles.body}>
            <div className={styles.steps}>
                <TransactionStep
                    label={texts.approve.title}
                    description={texts.approve.description}
                    state={state.approveState}
                />

                <TransactionStep
                    label={texts.confirm.title}
                    description={texts.confirm.description}
                    state={state.confirmState}
                />
            </div>

            <div className={styles.bottom}>
                {transactionError && <div className={styles.error}>
                    {transactionError}
                </div>}

                <div className={styles.buttons}>
                    {transactionError && <Button
                        view='primary'
                        onClick={retryTransaction}
                    >
                        Try again
                    </Button>}

                    <Button
                        view='secondary'
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}