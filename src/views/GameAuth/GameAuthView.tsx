import { useCallback, useState } from 'react';
import { AuthContainer, PageNotFound } from '@/components/Layout';
import { AuthHead } from './components/Head/AuthHead';
import { AuthWallets } from './components/Stage/AuthWallets';
import { AuthConnect } from './components/Stage/AuthConnect';
import { AuthSuccess } from './components/Stage/AuthSuccess';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useParams } from 'react-router-dom';
import { games } from '@/config/game';
import styles from './GameAuthView.module.scss';

export function GameAuthView() {
    const { gameID } = useParams() as { gameID: string };
    const { isConnected } = useAccount();
    const [walletLinked, setWalletLinked] = useState(false);

    const game = games[gameID];
    const handleWalletLinked = useCallback(() => {
        setWalletLinked(true);
    }, [setWalletLinked]);

    const renderStage = useCallback(() => {
        if (!isConnected) {
            return (<AuthWallets />);
        }

        if (!walletLinked) {
            return (
                <AuthConnect
                    gameID={gameID}
                    gameName={game.name}
                    onWalletLinked={handleWalletLinked}
                />
            );
        }

        return (<AuthSuccess />);
    }, [gameID, game, isConnected, walletLinked, handleWalletLinked]);

    if (!game) {
        return (<PageNotFound />);
    }

    return (
        <AuthContainer background={game.background}>
            <AuthHead
                gameName={game.name}
                gameLogo={game.logo}
                walletLinked={walletLinked}
            />

            <div className={styles.content}>
                {renderStage()}
            </div>
        </AuthContainer>
    );
}