import { PageLayout } from '@/components/Layout';
import { CollectionsView } from '@/views/Collections/CollectionsView';
import { ErrorView } from '@/views/Error';
import { GamesView } from '@/views/Games/GamesView';
import { SingleGame } from '@/views/Games/SingleGame/SingleGame';
import { MainView } from '@/views/Home/HomeView';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
    {
        element: <PageLayout />,
        errorElement: <ErrorView />,
        children: [
            {
                path: '/',
                element: <MainView />,
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
                element: <SingleGame />,
            },
        ],
    },
]);
