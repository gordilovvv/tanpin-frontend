import { PropsWithChildren, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type ScrollTopOnMountProps = PropsWithChildren;

export function ScrollTopOnMount({ children }: ScrollTopOnMountProps) {
    const location = useLocation();

    useEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            // @ts-ignore
            behavior: 'instant'
        });
    }, [location]);

    return (<>
        {children}
    </>);
}