import { PageLayout } from '@/components/Layout';
import { CollectionsView } from '@/views/Collections/CollectionsView';
import { ErrorView } from '@/views/Error';
import { GamesView } from '@/views/Games/GamesView';
import { HomeView } from '@/views/Home/HomeView';
import { SingleGameView } from '@/views/Games/SingleGame/SingleGameView';
import { SingleCollectionView } from '@/views/Collections/SingleCollection/SingleCollectionView';
import { createBrowserRouter } from 'react-router-dom';
import { SingleNftView } from '@/views/Nft/SingleNft/SingleNftView';

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

                path: '/collections/:id',
                element: <SingleCollectionView />
            },
            {

                path: '/nft/:id',
                element: <SingleNftView />
            },
            {
                path: '/games/:id',
                element: <SingleGameView />,
            },
        ],
    },
]);
