import { PageLayout } from '@/components/Layout';
import { ErrorView } from '@/views/Error';
import { GamesView } from '@/views/Games/GamesView';
import { HomeView } from '@/views/Home/HomeView';
import { SingleGameView } from '@/views/Games/SingleGame/SingleGameView';
import { SingleCollectionView } from '@/views/Collections/SingleCollection/SingleCollectionView';
import { createBrowserRouter } from 'react-router-dom';
import { SingleNftView } from '@/views/Nft/SingleNft/SingleNftView';
import { NFTView } from '@/views/Nft/NFTView';
import { ActivityView } from '@/views/Activity/ActivityView';
import { AssetsView } from '@/views/Assets/AssetsView';
import { CollectionsView } from '@/views/Collections/CollectionsView';
import { CollectionsView as CollectionsAssetsView } from '@/views/Assets/Collections/CollectionsView';
import { OwnedView } from '@/views/Assets/Owned/OwnedView';
import { SaleView } from '@/views/Assets/Sale/SaleView';
import { RequireConnectedWallet } from './requireConnectedWallet';
import { MintTokenView } from '@/views/MintToken/MintTokenView';

// TODO: LazyLoad Routes
// https://loadable-components.com/docs/getting-started/
export const router = createBrowserRouter([
    {
        element: <PageLayout />,
        errorElement: <ErrorView />,
        children: [
            {
                path: '/',
                element: <HomeView />
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
                path: '/nft',
                element: <NFTView />
            },
            {
                path: '/:gameID',
                element: <SingleGameView />
            },
            {
                path: '/:gameID/:collectionID',
                element: <SingleCollectionView />
            },
            {
                path: '/:gameID/:collectionID/:tokenID',
                element: <SingleNftView />
            },
            {
                element: (
                    <RequireConnectedWallet>
                        <AssetsView />
                    </RequireConnectedWallet>
                ),
                children: [
                    {
                        path: '/assets/collections',
                        element: <CollectionsAssetsView />
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
                path: '/activity',
                element: (
                    <RequireConnectedWallet>
                        <ActivityView />
                    </RequireConnectedWallet>
                ),
            }
        ],
    },
    {
        path: '/token/mint/:tokenID',
        element: <MintTokenView />
    },
]);
