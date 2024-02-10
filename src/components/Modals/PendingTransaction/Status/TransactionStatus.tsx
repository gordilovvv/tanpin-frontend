import { useTranslation } from '@/localization';
import { TransactionStatus as TransactionStatusEnum } from '@/hooks/useTransactionStatus';
import classNames from 'classnames';
import styles from './TransactionStatus.module.scss';

type TransactionStatusProps = {
    status: TransactionStatusEnum
}

export function TransactionStatus({ status }: TransactionStatusProps) {
    const { t } = useTranslation();
    const statusNames: Record<TransactionStatusEnum, string> = {
        [TransactionStatusEnum.PENDING]: t('Pending'),
        [TransactionStatusEnum.FAIL]: t('Fail'),
        [TransactionStatusEnum.SUCCESS]: t('Success')
    };

    return (
        <div className={classNames(styles.status, styles[status])}>
            <div className={styles.statusCircle}></div>

            <div className={styles.statusText}>
                {statusNames[status]}
            </div>
        </div>
    );
}