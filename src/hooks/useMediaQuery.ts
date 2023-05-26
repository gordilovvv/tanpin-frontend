import { useEffect, useState } from 'react';

/**
 * Hook checks if window size matches to media query
 * @param query CSS Media Query
 */
export function useMediaQuery(
    query:
    | '(max-width: 767px)'
    | '(max-width: 1000px)'
    | '(max-width: 1200px)'
    | '(max-width: 1400px)'
    | '(max-width: 1600px)',
) {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
        const mql = window.matchMedia(query);

        setMatches(mql.matches);

        const onChange = () => {
            setMatches(!!mql.matches);
        };

        mql.addEventListener('change', onChange);

        return () => mql.removeEventListener('change', onChange);
    }, [query]);

    return matches;
}
