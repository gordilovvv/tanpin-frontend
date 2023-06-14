import { RouterProvider } from 'react-router-dom';
import { router } from './app/routing';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from './config/wagmi';
import { useAccountEventListener } from './hooks/useAccountEventListener';
import { SnackbarProvider } from 'notistack';
import { Toast } from './uikit';


//это надо куда то вынести, но проблема была в том, что там где ты сказал это написать это работало с той ошибкой
// плюс плагин не дает переназвать дефолтные варианты, поэтому пришлось придумывать свои имена
declare module 'notistack' {
    interface VariantOverrides {
        success: false;
        info: false;

        error: false;
        warning: false;
        default: false;

        common: true
        loading: true
        danger: true
        alert: true
    }
}

function App() {
    useAccountEventListener();

    return (
        <SnackbarProvider
            Components={{
                loading: Toast,
                common: Toast,
                danger: Toast,
                alert: Toast,
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <WagmiConfig config={wagmiConfig}>
                <RouterProvider router={router} />
            </WagmiConfig>
        </SnackbarProvider>
    );
}

export default App;
