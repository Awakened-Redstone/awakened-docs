import cn from 'clsx'
import type { ComponentProps, ReactElement } from 'react'
import React from 'react'
import styles from './steps.module.css'

export function Steps({children, className, ...props}: ComponentProps<'div'>): ReactElement {
    return (
        <div
            className={cn(
                `${styles.nextraSteps} ml-4 mb-12 border-l border-gray-200 pl-6`,
                'border-solid dark:border-neutral-800 [counter-reset:step]',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}