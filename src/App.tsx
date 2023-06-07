import { RouterProvider } from 'react-router-dom';
import { router } from './app/routing';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from './config/wagmi';
import { useAccountEventListener } from './hooks/useAccountEventListener';

function App() {
    useAccountEventListener();

    return (
        <WagmiConfig config={wagmiConfig}>
            <RouterProvider router={router} />
        </WagmiConfig>
    );
}

export default App;
