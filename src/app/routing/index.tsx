import { PageLayout } from '@/components/Layout';
import { CollectionsView } from '@/views/Collections/CollectionsView';
import { ErrorView } from '@/views/Error';
import { GamesView } from '@/views/Games/GamesView';
import { MainView } from '@/views/Home/HomeView';
import { SingleCollectionView } from '@/views/Collections/SingleCollection/SingleCollectionView';
import { createBrowserRouter } from 'react-router-dom';

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
                path: '/collection',
                element: <SingleCollectionView />
            },
        ]
    },
]);
