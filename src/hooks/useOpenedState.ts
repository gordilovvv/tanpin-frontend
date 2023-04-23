import { useCallback, useState } from 'react';
  
/**
 * Hook used to help handle common open, close, or toggle scenarios
 */
export function useOpenedState() {
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => {
        setIsOpen(true);
    }, []);
  
    const close = useCallback(() => {
        setIsOpen(false);
    }, []);
  
    const toggle = useCallback(() => {
        if (isOpen) {
            close();
        } else {
            open();
        }
    }, [isOpen, open, close]);
  
    return {
        isOpen,
        open,
        close,
        toggle
    };
}
  