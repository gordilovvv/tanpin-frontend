import classNames from 'classnames';
import { Button, Modal, ModalBody, ModalHead, Spin, UnstyleLink } from '@/uikit';
import { getTransactionExplorerURL } from '@/utils/explorer';
import styles from './PendingTransaction.module.scss';

enum STATUSES {
    error = 'error',
    pending = 'pending',
    success = 'success'
}

const Statuses = {
    [STATUSES.error]: {
        label: 'Error',
    },
    [STATUSES.pending]: {
        label: 'Pending',
    },
    [STATUSES.success]: {
        label: 'Success',
    }
};


type PendingTransactionProps = {
    isOpen: boolean,
    onClose: () => void,
    transactionHash: string,
    status: STATUSES
}

export function PendingTransaction({ isOpen = true, onClose, transactionHash = '3242352352332', status = STATUSES.success }: PendingTransactionProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalHead title='Transaction sent' />

            <ModalBody>
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <div className={styles.text}>Sale is successfully cancelled. Updates will appear as soon as transaction is confirmed.</div>

                        <div className={styles.inner}>
                            <div className={styles.item}>
                                <div className={styles.label}>Transaction Hash</div>

                                <UnstyleLink
                                    href={getTransactionExplorerURL(transactionHash)}
                                    rel='noreferrer noopener'
                                    target='_blank'
                                    className={styles.value}
                                >{transactionHash}</UnstyleLink>
                            </div>

                            <div className={styles.item}>
                                <div className={styles.label}>Status</div>
                                <div className={styles.right}><span className={classNames(styles.dot, styles[status])} /><span className={styles.value}>{Statuses[status].label}</span></div>
                            </div>
                        </div>
                    </div>

                    {
                        status === STATUSES.pending
                            ?
                            <Spin size="s" />
                            :
                            <Button
                                view="secondary"
                            >Close</Button>
                    }
                </div>
            </ModalBody>
        </Modal>
    );
}