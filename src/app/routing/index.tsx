import { PageLayout } from '@/components/Layout';
import { ErrorView } from '@/views/Error';
// import { GamesView } from '@/views/Games/GamesView';
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
import { DepositView } from '@/views/Deposit/DepositView';
import { DepositSuccessView } from '@/views/Deposit/DepositSuccess/DepositSuccessView';
import { DepositRejectedView } from '@/views/Deposit/DepositRejected/DepositRejectedView';
import { EmptyLayout } from '@/components/Layout/Empty/EmptyLayout';
import { GameAuthView } from '@/views/GameAuth/GameAuthView';

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
            // {
            //     path: '/games',
            //     element: <GamesView />
            // },
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
                path: '/deposit',
                element: <DepositView />,

            },
            {
                path: '/deposit/success',
                element: <DepositSuccessView />
            },
            {
                path: '/deposit/rejected',
                element: <DepositRejectedView />
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
        element: <EmptyLayout />,
        errorElement: <ErrorView />,
        children: [
            {
                path: '/game/auth',
                element: <GameAuthView />
            }
        ]
    }
]);
