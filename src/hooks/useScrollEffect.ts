import { RefObject, useEffect } from 'react';

export function useScrollEffect(domRef: RefObject<HTMLDivElement>, dependency: any) {
    useEffect(() => {
        if (domRef.current) {
            const top = domRef.current.getBoundingClientRect().top;

            if (top < 0) {
                window.scrollTo({
                    top: top + window.scrollY - 100,
                    behavior: 'smooth'
                });
            }
        }
    }, [dependency]);
}