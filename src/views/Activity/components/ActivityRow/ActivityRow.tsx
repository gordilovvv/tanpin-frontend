import { ActivityTransaction } from '@/states/types';
import styles from './ActivityRow.module.scss';

type ActivityRowProps = {
    tx: ActivityTransaction
}

export function ActivityRow({ tx }: ActivityRowProps) {
    return (
        <div>
            {tx.owner}
        </div>
    );
}