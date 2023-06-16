import { Mark, Spin } from '@/uikit';
import { LoadingStatus } from '@/hooks/useApproveConfirmCallbacks';
import styles from './TransactionStep.module.scss';

type TransactionStepProps = {
    label: string
    description: string
    state: {
        error?: string
        status: LoadingStatus
    }
}

export function TransactionStep({ label, description, state }: TransactionStepProps) {
    const renderIndicator = () => {
        if (state.status === LoadingStatus.LOADING) {
            return <div className={styles.loadingCircle}>
                <Spin size='xs' />
            </div>;
        }

        if (state.status === LoadingStatus.SUCCESS) {
            return <div className={styles.successCircle}>
                <Mark />
            </div>;
        }

        return <div className={styles.idleCircle}></div>;
    };

    return (
        <div className={styles.step}>
            <div className={styles.indicator}>
                {renderIndicator()}
            </div>

            <div className={styles.content}>
                <div className={styles.label}>
                    {label}
                </div>

                <div className={styles.description}>
                    {description}
                </div>
            </div>
        </div>
    );
}