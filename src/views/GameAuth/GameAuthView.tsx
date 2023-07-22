import { useState } from 'react';
import styles from './GameAuthView.module.scss';
import { LoginStage } from './components/Login/LoginStage';
import { SuccessStage } from './components/Success/SuccessStage';
import { useSearchParams } from 'react-router-dom';

export function GameAuthView() {
    const [searchParams] = useSearchParams();
    const [stage, setStage] = useState<'login' | 'success'>('login');

    const key = searchParams.get('key');
    const hash = searchParams.get('hash');

    const handleSuccess = () => {
        setStage('success');
    };

    if (!key || !hash) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.body}>
                    No Query Params!
                </div>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                {stage === 'login' ? <LoginStage
                    keyID={key}
                    hash={hash}
                    onSuccess={handleSuccess}
                /> : <SuccessStage />}
            </div>
        </div>
    );
}