import { useState } from 'react';
import { AuthStage } from './AuthStage/AuthStage';
import { SuccessStage } from './SuccessStage/SuccessStage';
import styles from './GameLoginView.module.scss';

export function GameLoginView() {
    const [isSuccess, setIsSuccess] = useState(false);

    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                {
                    !isSuccess
                        ?
                        <AuthStage />
                        :
                        <SuccessStage />
                }
            </div>
        </div>
    );
}