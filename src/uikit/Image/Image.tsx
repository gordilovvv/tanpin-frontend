import { ImgHTMLAttributes, ReactNode, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Image.module.scss';

type ImageProps = {
    pending?: ReactNode,
    rejected?: ReactNode,
    onError?: () => void,
    onFulfilled?: () => void
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'onLoad' | 'onError'>

export const Image = forwardRef<HTMLImageElement, ImageProps>(
    ({ src, pending, rejected, onError, onFulfilled, className, ...props }, ref) => {
        const imageRef = useRef<HTMLImageElement>(null);
        const [loaded, setLoaded] = useState<boolean>(false);

        useEffect(() => {
            if (src) {
                const image = imageRef.current;

                if (image) {
                    const handleError = () => {
                        onError?.();
                    };

                    image.addEventListener('error', handleError);

                    return () => {
                        image.removeEventListener('error', handleError);
                    };
                }
            }

        }, [src, imageRef, onError]);

        useImperativeHandle(
            ref,
            () => imageRef.current!
        );

        const onLoad = useCallback(() => {
            const image = imageRef.current;

            if (image) {
                setLoaded(true);
                onFulfilled?.();
            }
        }, [imageRef, setLoaded, onFulfilled]);

        if (src) {
            return (<>
                <img
                    ref={imageRef}
                    {...props}
                    src={src}
                    loading='lazy'
                    onLoad={onLoad}
                    className={classNames(styles.image, className, {
                        [styles.loading]: !loaded,
                        [styles.loaded]: loaded
                    })}
                />

                {!loaded && pending}
            </>);
        }

        if (rejected) {
            return (<>{rejected}</>);
        }

        return null;
    }
);

Image.displayName = 'Image';