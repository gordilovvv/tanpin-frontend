import { PageLayout } from '@/components/Layout';
import { useUserStore } from '@/states/user/store';
import { CollectionsView } from '@/views/Collections/CollectionsView';
import { ErrorView } from '@/views/Error';
import { GamesView } from '@/views/Games/GamesView';
import { MainView } from '@/views/Home/HomeView';

import { createBrowserRouter, redirect } from 'react-router-dom';

const isAuthenticatedLoader = () => {
    const { isLoggedIn } = useUserStore.getState();
    if (!isLoggedIn()) {
        return redirect('/login');
    }
    return null;
};

export const router = createBrowserRouter([
    {
        element: <PageLayout />,
        errorElement: <ErrorView />,
        children: [
            {
                path: '/',
                element: <MainView />
            },
            {
                path: '/games',
                element: <GamesView />
            },
            {
                path: '/collections',
                element: <CollectionsView />
            },
            {
                path: 'protected',
                element: <div>Protected Route</div>,
                loader: isAuthenticatedLoader
            },
            {
                path: 'login',
                element: <div>Login Page</div>
            }
        ]
    },]);
