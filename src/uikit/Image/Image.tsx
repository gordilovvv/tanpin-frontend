import { ImgHTMLAttributes, ReactNode, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Image.module.scss';

type ImageProps = {
    pending?: ReactNode,
    rejected?: ReactNode
} & ImgHTMLAttributes<HTMLImageElement>

export const Image = forwardRef<HTMLImageElement, ImageProps>(
    ({ src, pending, rejected, className, ...props }, ref) => {
        const imageRef = useRef<HTMLImageElement>(null);
        const [isLoaded, setLoaded] = useState(false);

        useImperativeHandle(
            ref,
            () => imageRef.current!
        );

        useEffect(() => {
            if (imageRef.current) {
                const onLoad = () => {
                    setLoaded(true);
                };

                const onError = () => {
                    setLoaded(false);
                };

                imageRef.current.addEventListener('load', onLoad);
                imageRef.current.addEventListener('error', onError);

                return () => {
                    imageRef.current?.addEventListener('load', onLoad);
                    imageRef.current?.addEventListener('error', onError);
                };
            }
        }, [imageRef]);

        if (src) {
            return (<>
                <img
                    ref={imageRef}
                    src={src}
                    {...props}
                    className={classNames(styles.image, className, {
                        [styles.loading]: !isLoaded,
                        [styles.loaded]: isLoaded
                    })}
                />

                {!isLoaded && pending}
            </>);
        }

        if (rejected) {
            return (<>{rejected}</>);
        }

        return null;
    }
);

Image.displayName = 'Image';