import { lazy } from 'react';
import { LazyComponent } from '@/components/LazyComponent';
import { PageError, PageLayout, PageNotFound } from '@/components/Layout';
import { EmptyLayout } from '@/components/Layout/Empty/EmptyLayout';
import { createBrowserRouter } from 'react-router-dom';
import { RequireConnectedWallet } from './requireConnectedWallet';
import { PAYMENT_PAGE_AVAILABLE } from '@/config';

import { HomeView } from '@/views/Home/HomeView';
import { NFTView } from '@/views/Nft/NFTView';
import { CollectionsView } from '@/views/Collections/CollectionsView';
import { SingleCollectionView } from '@/views/Collections/SingleCollection/SingleCollectionView';
import { DepositView } from '@/views/Deposit/DepositView';
import { DepositInvoiceView } from '@/views/Deposit/DepositInvoice/DepositInvoiceView';
import { DepositSuccessView } from '@/views/Deposit/DepositSuccess/DepositSuccessView';
import { DepositRejectedView } from '@/views/Deposit/DepositRejected/DepositRejectedView';
import { TelegramAuthView } from '@/views/TelegramAuth/TelegramAuthView';

// Lazy components
const SingleNftView = lazy(() => import('@/views/Nft/SingleNft/SingleNftView').then(module => ({ default: module.SingleNftView })));
const GameAuthView = lazy(() => import('@/views/GameAuth/GameAuthView').then(module => ({ default: module.GameAuthView })));
const AssetsView = lazy(() => import('@/views/Assets/AssetsView').then(module => ({ default: module.AssetsView })));
const OwnedView = lazy(() => import('@/views/Assets/Owned/OwnedView').then(module => ({ default: module.OwnedView })));
const ActivityView = lazy(() => import('@/views/Activity/ActivityView').then(module => ({ default: module.ActivityView })));
const TokenClaimView = lazy(() => import('@/views/TokenClaim/TokenClaimView').then(module => ({ default: module.TokenClaimView })));

export const router = createBrowserRouter([
    {
        element: <PageLayout />,
        errorElement: <PageError />,
        children: [
            {
                path: '/',
                element: <HomeView />
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
                path: '/claim',
                element: <LazyComponent element={TokenClaimView} />
            },
            {
                path: '/collection/:collectionID',
                element: <SingleCollectionView />
            },
            {
                path: '/:contractAddress/:tokenID',
                element: <LazyComponent element={SingleNftView} />
            },
            ...(PAYMENT_PAGE_AVAILABLE ? [{
                path: '/deposit',
                element: <DepositView />,
            }] : []),
            {
                path: '/deposit/invoice/:invoiceID',
                element: <DepositInvoiceView />,
            },
            {
                element: (
                    <RequireConnectedWallet>
                        <LazyComponent element={AssetsView} />
                    </RequireConnectedWallet>
                ),
                children: [
                    // {
                    //     path: '/assets/sale',
                    //     element: <SaleView />
                    // },
                    {
                        path: '/assets/owned',
                        element: <LazyComponent element={OwnedView} />
                    },
                ]
            },
            {
                path: '/activity',
                element: (
                    <RequireConnectedWallet>
                        <LazyComponent element={ActivityView} />
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
                path: '/:gameID/auth',
                element: <LazyComponent element={GameAuthView} />
            },
            ...(
                PAYMENT_PAGE_AVAILABLE
                    ? [{
                        path: '/deposit/success',
                        element: <DepositSuccessView />
                    },
                    {
                        path: '/deposit/rejected',
                        element: <DepositRejectedView />
                    }]
                    : []
            ),
            {
                path: '/telegram/auth',
                element: <TelegramAuthView />
            },
        ]
    },
    {
        path: '*',
        element: <PageNotFound />
    }
]);
