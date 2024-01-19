import { useCallback, useState } from 'react';
import { Logo } from '@/uikit';
import { AuthContainer } from '@/components/Layout';
import { LoginStage } from './components/Login/LoginStage';
import { SuccessStage } from './components/Success/SuccessStage';
import { useSearchParams } from 'react-router-dom';
import styles from './GameAuthView.module.scss';

enum Stage {
    LOGIN = 'login',
    SUCCESS = 'success'
}

export function GameAuthView() {
    const [searchParams] = useSearchParams();
    const [stage, setStage] = useState<Stage>(Stage.LOGIN);

    const gameHash = searchParams.get('hash');
    const gameValue = searchParams.get('key');

    const handleSuccessAuth = useCallback(() => {
        setStage(Stage.SUCCESS);
    }, [setStage]);

    const renderContent = () => {
        if (!gameHash || !gameValue) {
            return (<div className={styles.error}>
                No query params!
            </div>);
        }

        if (stage === Stage.LOGIN) {
            return <LoginStage
                gameHash={gameHash}
                gameValue={gameValue}
                onSuccess={handleSuccessAuth}
            />;
        }

        if (stage === Stage.SUCCESS) {
            return <SuccessStage />;
        }

        return null;
    };

    return (
        <AuthContainer>
            <Logo className={styles.logo} />
            {renderContent()}
        </AuthContainer>
    );
}