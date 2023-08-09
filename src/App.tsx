import { RouterProvider } from 'react-router-dom';
import { router } from './app/routing';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from './config/wagmi';
import { ToastProvider } from './uikit';

function App() {
    return (
        <WagmiConfig config={wagmiConfig}>
            <ToastProvider>
                <RouterProvider router={router} />
            </ToastProvider>
        </WagmiConfig>
    );
}

export default App;
