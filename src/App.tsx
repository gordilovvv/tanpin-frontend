import { RouterProvider } from 'react-router-dom';
import { router } from './app/routing';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from './config/wagmi';
import { ToastProvider } from './uikit';
import { useYandexMetrika } from './app/useYandexMetrika';
import { useResourceBundleLoader } from './localization';

function App() {
    useYandexMetrika();
    const { isLoading } = useResourceBundleLoader();

    return (
        <WagmiConfig config={wagmiConfig}>
            <ToastProvider>
                {!isLoading && <RouterProvider router={router} />}
            </ToastProvider>
        </WagmiConfig>
    );
}

export default App;
