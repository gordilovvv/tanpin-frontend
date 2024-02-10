import { useEffect, useState } from 'react';
import { Button, Spin, UnstyleLink } from '@/uikit';
import { StatusLoader } from '../Status/StatusLoader';
import { TransactionStatus } from '../Status/TransactionStatus';
import { TransactionDetail } from '../Detail/TransactionDetail';
import { TransactionStatus as TransactionStatusEnum } from '@/hooks/useTransactionStatus';
import { getTransactionExplorerURL } from '@/utils/explorer';
import { PendingTransaction } from '@/states/global/types';
import { useTranslation } from '@/localization';
import styles from './TransactionInfo.module.scss';

type TransactionInfoProps = {
    hash: PendingTransaction['hash'],
    onClose?: () => void,
    onReject: () => Promise<void>,
    onConfirm: () => Promise<void>
}

export function TransactionInfo({ hash, onClose, onReject, onConfirm }: TransactionInfoProps) {
    const { t } = useTranslation();
    const [status, setStatus] = useState<TransactionStatusEnum>(TransactionStatusEnum.PENDING);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (status === TransactionStatusEnum.FAIL) {
            onReject();
        }

        if (status === TransactionStatusEnum.SUCCESS) {
            setLoading(true);
            onConfirm().then(() => setLoading(false));
        }
    }, [status, onReject, onConfirm]);

    return (
        <div className={styles.wrap}>
            <div className={styles.box}>
                <TransactionDetail label={t('Transaction ID')}>
                    <UnstyleLink
                        href={getTransactionExplorerURL(hash)}
                        rel='noreferrer noopener'
                        target='_blank'
                        className={styles.value}
                    >
                        {hash}
                    </UnstyleLink>
                </TransactionDetail>

                <TransactionDetail label={t('Status')}>
                    {status === TransactionStatusEnum.PENDING
                        ? <StatusLoader
                            hash={hash}
                            onChange={setStatus}
                        >
                            <TransactionStatus status={status} />
                        </StatusLoader>
                        : <TransactionStatus status={status} />
                    }
                </TransactionDetail>
            </div>

            <div className={styles.bottom}>
                {status === TransactionStatusEnum.PENDING || isLoading
                    ? <div className={styles.loader}>
                        <Spin size='s' />

                        <div className={styles.loaderText}>
                            {t('Waiting for confirmations...')}
                        </div>
                    </div>
                    : <Button
                        view='secondary'
                        onClick={onClose}
                    >
                        {t('View NFT')}
                    </Button>}
            </div>
        </div>
    );
}