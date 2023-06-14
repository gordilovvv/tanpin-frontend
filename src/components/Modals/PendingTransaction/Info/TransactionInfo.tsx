import { useEffect, useState } from 'react';
import { Hash, TransactionReceipt } from 'viem';
import { Button, Spin, UnstyleLink } from '@/uikit';
import { TransactionDetail } from '../Detail/TransactionDetail';
import { viemClient } from '@/config/viem';
import { FAST_INTERVAL } from '@/config/constants';
import { getTransactionExplorerURL } from '@/utils/explorer';
import classNames from 'classnames';
import styles from './TransactionInfo.module.scss';

enum TransactionStatus {
    PENDING = 'pending',
    FAIL = 'fail',
    SUCCESS = 'success'
}

type TransactionInfoProps = {
    hash: Hash
    onClose?: () => void
    onTransactionReceipt: (receipt?: TransactionReceipt) => void
}

export function TransactionInfo({ hash, onClose, onTransactionReceipt }: TransactionInfoProps) {
    const [status, setStatus] = useState<TransactionStatus>(TransactionStatus.PENDING);

    const statusNames: Record<TransactionStatus, string> = {
        [TransactionStatus.PENDING]: 'Pending',
        [TransactionStatus.FAIL]: 'Fail',
        [TransactionStatus.SUCCESS]: 'Success'
    };

    useEffect(() => {
        viemClient.waitForTransactionReceipt({
            hash,
            pollingInterval: FAST_INTERVAL
        })
            .then(receipt => {
                if (receipt.status) {
                    setStatus(TransactionStatus.SUCCESS);
                } else {
                    setStatus(TransactionStatus.FAIL);
                }

                onTransactionReceipt(receipt);
            })
            .catch(() => {
                setStatus(TransactionStatus.FAIL);
                onTransactionReceipt(undefined);
            });
    }, [hash]);

    return (
        <div className={styles.wrap}>
            <div className={styles.box}>
                <TransactionDetail label='Transaction ID'>
                    <UnstyleLink
                        href={getTransactionExplorerURL(hash)}
                        rel='noreferrer noopener'
                        target='_blank'
                        className={styles.value}
                    >
                        {hash}
                    </UnstyleLink>
                </TransactionDetail>

                <TransactionDetail label='Status'>
                    <div className={classNames(styles.status, styles[status])}>
                        <div className={styles.statusCircle}></div>

                        <div className={styles.statusText}>
                            {statusNames[status]}
                        </div>
                    </div>
                </TransactionDetail>
            </div>

            <div className={styles.bottom}>
                {status === TransactionStatus.PENDING
                    ? <Spin size='s' />
                    : <Button
                        view='secondary'
                        onClick={onClose}
                    >
                        Close
                    </Button>}
            </div>
        </div>
    );
}