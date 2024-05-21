import { AuthContainer } from '@/components/Layout';
import { useSearchParams } from 'react-router-dom';
import { games } from '@/config/game';
import { useEffect, useState } from 'react';
import { api } from '@/app/api';
import { logError } from '@/utils/sentry';

enum Stage {
    CONNECTED,
    LOADING,
    FAILED
}

export function BlackRussiaAuthView() {
    const [searchParams] = useSearchParams();
    const game = games['black-russia'];
    const [stage, setStage] = useState(Stage.LOADING);
    const [profile, setProfile] = useState<Record<string, any> | undefined>();
    const [accessToken, setAccessToken] = useState<string | undefined>();

    const handleLogin = async () => {
        try {
            // ?player_id=1&server_id=1&nickname=Вася&server_name=Москва&timestamp=1716323218&hash=7388f75d27b30ff49d270b1ea13f47b5ee6d603d50341b4bdb3f0fd6c8a43bba
            const { data } = await api.post<{
                userId: number,
                accessToken: string,
                refreshToken: string
            }>('https://play-api.tanpin.io/auth/session/black-russia', {
                playerId: parseInt(searchParams.get('player_id')!),
                serverId: parseInt(searchParams.get('server_id')!),
                nickname: decodeURIComponent(searchParams.get('nickname')!),
                serverName: decodeURIComponent(searchParams.get('server_name')!),
                timestamp: parseInt(searchParams.get('timestamp')!),
                hash: searchParams.get('hash')
            });

            setAccessToken(data.accessToken);
            setStage(Stage.CONNECTED);
        } catch (error) {
            setStage(Stage.FAILED);
            logError(error);
        }
    };

    const handleProfile = async () => {
        try {
            const { data } = await api.get<Record<string, any>>('https://play-api.tanpin.io/user/profile', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            setProfile(data);
        } catch (error) {
            setStage(Stage.FAILED);
            logError(error);
        }
    };

    useEffect(() => {
        handleLogin();
    }, []);

    useEffect(() => {
        if (accessToken) {
            handleProfile();
        }
    }, [accessToken]);

    const render = () => {
        if (profile) {
            return <>
                <h2>{profile.blackRussia.nickname} ({profile.blackRussia.serverName})</h2>
                <h3>Balance {profile.balance} Tanpin Points</h3>
                <p>DATA: {JSON.stringify(profile)}</p>
            </>;
        }

        if (stage === Stage.LOADING) {
            return <>Loading...</>;
        }

        if (stage === Stage.CONNECTED) {
            return <>Loading profile...</>;
        }

        if (stage === Stage.FAILED) {
            return <>Auth failed</>;
        }

        return null;
    };

    return (
        <AuthContainer background={game.background}>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0,1fr)',
                    gap: '16px',
                    textAlign: 'center',
                    maxWidth: '500px',
                    wordBreak: 'break-all',
                    margin: '0 auto'
                }}
            >
                {render()}
            </div>
        </AuthContainer>
    );
}