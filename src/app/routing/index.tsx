import { PageLayout } from '@/components/Layout';
import { CollectionsView } from '@/views/Collections/CollectionsView';
import { ErrorView } from '@/views/Error';
import { GamesView } from '@/views/Games/GamesView';
import { HomeView } from '@/views/Home/HomeView';
import { SingleGameView } from '@/views/Games/SingleGame/SingleGameView';
import { SingleCollectionView } from '@/views/Collections/SingleCollection/SingleCollectionView';
import { createBrowserRouter } from 'react-router-dom';
import { SingleNftView } from '@/views/Nft/SingleNft/SingleNftView';
import { NFTView } from '@/views/Nft/NFTView';
import { ActivityView } from '@/views/Activity/ActivityView';

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
                path: '/nft',
                element: <NFTView />,
            },
            {
                path: '/activity',
                element: <ActivityView />,
            },
            {
                path: '/:gameID',
                element: <SingleGameView />,
            },
            {
                path: '/activity',
                element: <ActivityView />,
            },
            {
                path: '/:gameID/:collectionID',
                element: <SingleCollectionView />,
            },
            {
                path: '/:gameID/:collectionID/:tokenID',
                element: <SingleNftView />,
            },
        ],
    },
]);
