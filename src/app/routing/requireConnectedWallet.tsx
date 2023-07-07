import { useAccount } from '@/states/user/hooks/useAccount';
import { Navigate } from 'react-router-dom';

export function RequireConnectedWallet({ children }: { children: JSX.Element }) {
    const { isConnected } = useAccount();

    if (!isConnected) {
        return <Navigate
            to='/'
            replace
        />;
    }

    return children;
}