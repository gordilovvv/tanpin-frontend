import { LazyExoticComponent, Suspense } from 'react';

const Fallback = () => (<></>);

export const LazyComponent = ({
    element: Element,
}: {
    element: LazyExoticComponent<() => JSX.Element>
}) => (
    <Suspense fallback={<Fallback />}>
        <Element />
    </Suspense>
);