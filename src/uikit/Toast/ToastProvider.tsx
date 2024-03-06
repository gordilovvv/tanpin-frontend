import { PropsWithChildren, useMemo } from 'react';
import { SnackbarProvider } from 'notistack';
import { Toast } from './Toast';
import { ToastVariant } from './types';

// TODO: При открытии падает ошибка
// React does not recognize the `hideIconVariant` prop on a DOM element.
export function ToastProvider({ children }: PropsWithChildren<unknown>) {
    const TTL = 3_000;

    const components: Record<ToastVariant, React.JSXElementConstructor<any>> = useMemo(() => {
        return {
            [ToastVariant.SUCCESS]: Toast,
            [ToastVariant.LOADING]: Toast,
            [ToastVariant.DANGER]: Toast,
            [ToastVariant.WARNING]: Toast
        };
    }, []);

    return (
        <SnackbarProvider
            Components={components}
            dense
            maxSnack={3}
            autoHideDuration={TTL}
            hideIconVariant
            preventDuplicate
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            {children}
        </SnackbarProvider>
    );
}