import { RouterProvider } from 'react-router-dom';
import { router } from './app/routing';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from './config/wagmi';
import { useAccountEventListener } from './hooks/useAccountEventListener';
import { ToastProvider } from './uikit';

function App() {
    useAccountEventListener();

    return (
        <ToastProvider>
            <WagmiConfig config={wagmiConfig}>
                <RouterProvider router={router} />
            </WagmiConfig>
        </ToastProvider>
    );
}

export default App;
