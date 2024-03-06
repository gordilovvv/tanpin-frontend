import { useCallback } from 'react';
import { useToast } from '@/uikit';
import copy from 'copy-to-clipboard';

export function useCopyToClipboard(value: string, toastText: string) {
    const { toastSuccess } = useToast();
    const handleCopy = useCallback(() => {
        copy(value);
        toastSuccess(toastText);
    }, [value, toastText]);

    return { handleCopy };
}