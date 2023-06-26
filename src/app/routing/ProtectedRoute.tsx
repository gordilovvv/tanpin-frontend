import { useAccount } from '@/states/user/hooks/useAccount';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
    const { isConnected } = useAccount();

    return isConnected ? <Outlet /> : <Navigate to="/" />;
}