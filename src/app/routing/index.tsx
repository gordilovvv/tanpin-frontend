import { PageLayout } from '@/components/Layout';
import { ErrorView } from '@/views/Error';
import { GamesView } from '@/views/Games/GamesView';
import { HomeView } from '@/views/Home/HomeView';
import { SingleGameView } from '@/views/Games/SingleGame/SingleGameView';
import { SingleCollectionView } from '@/views/Collections/SingleCollection/SingleCollectionView';
import { createBrowserRouter } from 'react-router-dom';
import { SingleNftView } from '@/views/Nft/SingleNft/SingleNftView';
import { NFTView } from '@/views/Nft/NFTView';
import { AssetsView } from '@/views/Assets/AssetsView';
import { CollectionsView } from '@/views/Assets/Collections/CollectionsView';
import { OwnedView } from '@/views/Assets/Owned/OwnedView';
import { SaleView } from '@/views/Assets/Sale/SaleView';

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
                element: <AssetsView />,
                children: [
                    {
                        path: '/assets/collections',
                        element: <CollectionsView />
                    },
                    {
                        path: '/assets/sale',
                        element: <SaleView />
                    },
                    {
                        path: '/assets/owned',
                        element: <OwnedView />
                    },
                ]
            },
            {
                path: '/:gameID',
                element: <SingleGameView />,
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
