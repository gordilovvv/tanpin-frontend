import { PageError, PageLayout } from '@/components/Layout';
import { HomeView } from '@/views/Home/HomeView';
import { SingleGameView } from '@/views/Games/SingleGame/SingleGameView';
import { SingleCollectionView } from '@/views/Collections/SingleCollection/SingleCollectionView';
import { createBrowserRouter } from 'react-router-dom';
import { SingleNftView } from '@/views/Nft/SingleNft/SingleNftView';
import { NFTView } from '@/views/Nft/NFTView';
import { ActivityView } from '@/views/Activity/ActivityView';
import { AssetsView } from '@/views/Assets/AssetsView';
import { CollectionsView } from '@/views/Collections/CollectionsView';
import { OwnedView } from '@/views/Assets/Owned/OwnedView';
import { SaleView } from '@/views/Assets/Sale/SaleView';
import { RequireConnectedWallet } from './requireConnectedWallet';
import { DepositView } from '@/views/Deposit/DepositView';
import { DepositSuccessView } from '@/views/Deposit/DepositSuccess/DepositSuccessView';
import { DepositRejectedView } from '@/views/Deposit/DepositRejected/DepositRejectedView';
import { EmptyLayout } from '@/components/Layout/Empty/EmptyLayout';
import { GameAuthView } from '@/views/GameAuth/GameAuthView';
import { TokenClaimView } from '@/views/TokenClaim/TokenClaimView';
import { BUY_USDT_AVAILABLE } from '@/config';

// TODO: LazyLoad Routes
// https://loadable-components.com/docs/getting-started/
export const router = createBrowserRouter([
    {
        element: <PageLayout />,
        errorElement: <PageError />,
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
                path: '/claim',
                element: <TokenClaimView />
            },
            {
                path: '/:gameID',
                element: <SingleGameView />
            },
            ...(BUY_USDT_AVAILABLE ? [{
                path: '/deposit',
                element: <DepositView />,
            }] : []),
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
        errorElement: <PageError />,
        children: [
            {
                path: '/game/auth',
                element: <GameAuthView />
            },
            ...(BUY_USDT_AVAILABLE ? [{
                path: '/deposit/success',
                element: <DepositSuccessView />
            },
            {
                path: '/deposit/rejected',
                element: <DepositRejectedView />
            }] : []),
        ]
    }
]);
