import { RouterProvider } from 'react-router-dom';
import { router } from './app/routing';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from './config/wagmi';
import { ToastProvider } from './uikit';
import { useResourceBundleLoader } from './localization/language';

function App() {
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
