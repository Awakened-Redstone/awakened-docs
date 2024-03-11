import React, {ComponentProps, ReactElement, useCallback, useState} from "react";
import clsx from "clsx";

export function LazyImage({src, alt, ...props}: ComponentProps<'img'>): ReactElement {
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)

    const onLoad = useCallback(() => {
        setLoaded(true)
    }, [])

    const onError = useCallback(() => {
        setError(true)
    }, [])

    return (
        <>
            {
                !loaded && !error && (
                    <div>Loading image...</div>
                )
            }
            {
                error && (
                    <div>Failed to load image</div>
                )
            }
            <img
                {...props}
                src={src}
                alt={alt}
                loading={'lazy'}
                onLoad={onLoad}
                onError={onError}
                className={clsx(
                    'tw-transition-opacity',
                    loaded && 'tw-opacity-100',
                    error && 'tw-opacity-0'
                )}
            />
        </>
    )
}
