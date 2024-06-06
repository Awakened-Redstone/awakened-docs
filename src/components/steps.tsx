import cn from 'clsx'
import type { ComponentProps, ReactElement } from 'react'
import React from 'react'
import styles from '@components/steps.module.css'

export function Steps({children, className, ...props}: ComponentProps<'div'>): ReactElement {
    return (
        <div
            className={cn(
                `${styles.nextraSteps} tw-ml-4 tw-mb-12 tw-border-0 tw-border-l tw-border-gray-200 tw-pl-6`,
                'tw-border-solid dark:tw-border-neutral-800 [counter-reset:step]',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}
