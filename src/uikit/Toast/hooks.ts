import { useSnackbar, SnackbarKey, SnackbarMessage, OptionsWithExtraProps } from 'notistack';
import { useCallback } from 'react';
import { ToastVariant } from './types';

export function useToast() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar() as {
        // @ts-ignore
        enqueueSnackbar: (message: SnackbarMessage, options?: OptionsWithExtraProps<ToastVariant>) => SnackbarKey,
        closeSnackbar: (key?: SnackbarKey) => void
    };

    const close = useCallback((id: SnackbarKey) => {
        return closeSnackbar(id);
    }, [closeSnackbar]);

    const clearAll = useCallback(() => {
        return closeSnackbar();
    }, [closeSnackbar]);

    const toastLoading = useCallback(<
        TMessage extends string,
        TPromise extends Promise<any>
    >(text: TMessage, promise: TPromise) => {
        const id = enqueueSnackbar(text, {
            variant: ToastVariant.LOADING,
            persist: true
        });

        promise.finally(() => {
            closeSnackbar(id);
        });
    }, [enqueueSnackbar, closeSnackbar]);

    const toastDanger = useCallback((text: string) => {
        enqueueSnackbar(text, { variant: ToastVariant.DANGER });
    }, [enqueueSnackbar]);

    const toastWarning = useCallback((text: string) => {
        enqueueSnackbar(text, { variant: ToastVariant.WARNING });
    }, [enqueueSnackbar]);

    return {
        toastLoading,
        toastDanger,
        toastWarning,
        close,
        clearAll
    };
}