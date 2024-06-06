import React, {ComponentProps, ReactElement, useCallback, useState} from "react";
import clsx from "clsx";
import {Dialog, DialogContent, DialogTrigger} from "@shadcn/dialog";

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
            <Dialog>
                <DialogTrigger asChild={true}>
                    <img
                      {...props}
                      src={src}
                      alt={alt}
                      loading={'lazy'}
                      onLoad={onLoad}
                      onError={onError}
                      className={clsx(
                        'tw-transition-[transform,opacity,box-shadow] tw-cursor-pointer tw-rounded-sm hover:tw-shadow-2xl hover:-tw-translate-y-0.5',
                        loaded && 'tw-opacity-100',
                        error && 'tw-opacity-0'
                      )}
                    />
                </DialogTrigger>
                <DialogContent className={"tw-w-full tw-max-w-max"}>
                    <img
                      {...props}
                      src={src}
                      alt={alt}
                      loading={'lazy'}
                      onLoad={onLoad}
                      onError={onError}
                      className={clsx(
                        'tw-transition-opacity tw-w-full tw-h-full tw-rounded-sm',
                        loaded && 'tw-opacity-100',
                        error && 'tw-opacity-0'
                      )}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}
