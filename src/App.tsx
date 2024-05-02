import { RouterProvider } from 'react-router-dom';
import { router } from './app/routing';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from './config/wagmi';
import { ToastProvider } from './uikit';
import { LockScreen } from './components/Layout';
import { LOCK_MARKET } from './config';
import { useYandexMetrika } from './app/useYandexMetrika';
import { useResourceBundleLoader } from './localization';

function App() {
    useYandexMetrika();
    const { isLoading } = useResourceBundleLoader();

    if (LOCK_MARKET) {
        return (<LockScreen />);
    }

    return (
        <WagmiConfig config={wagmiConfig}>
            <ToastProvider>
                {!isLoading && <RouterProvider router={router} />}
            </ToastProvider>
        </WagmiConfig>
    );
}

export default App;
