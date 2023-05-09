import { PageLayout } from '@/components/Layout';
import { CollectionsView } from '@/views/Collections/CollectionsView';
import { ErrorView } from '@/views/Error';
import { GamesView } from '@/views/Games/GamesView';
import { SingleGameView } from '@/views/Games/SingleGame/SingleGameView';
import { HomeView } from '@/views/Home/HomeView';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
    {
        element: <PageLayout />,
        errorElement: <ErrorView />,
        children: [
            {
                path: '/',
                element: <HomeView />,
            },
            {
                path: '/games',
                element: <GamesView />,
            },
            {
                path: '/collections',
                element: <CollectionsView />,
            },
            {
                path: '/games/:id',
                element: <SingleGameView />,
            },
        ],
    },
]);
