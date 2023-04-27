import { RouterProvider } from 'react-router-dom';
import { router } from './app/routing';
import { WagmiConfig } from 'wagmi';
import { client } from './config/wallet/wagmi';
import { useAccountEventListener } from './hooks/useAccountEventListener';

function App() {
    useAccountEventListener();

    return (
        <WagmiConfig client={client}>
            <RouterProvider router={router} />
        </WagmiConfig>
    );
}

export default App;
