import { useEffect, useState } from 'react';

export function useLoaded(src: string | undefined) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!src) {
            return undefined;
        }

        setLoaded(false);

        let active = true;
        let image: HTMLImageElement | null = new Image();

        image.onload = () => {
            if (!active) {
                return;
            }

            setLoaded(true);
        };

        image.onerror = () => {
            if (!active) {
                return;
            }

            setLoaded(false);
        };

        image.src = src;

        return () => {
            active = false;
            image = null;
        };
    }, [src]);

    return loaded;
}