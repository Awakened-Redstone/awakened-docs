import React, {
    Children,
    cloneElement,
    ComponentProps,
    ReactElement,
    ReactNode,
    useEffect,
    useRef,
    useState
} from "react";
import cn from "clsx";
import {DetailsProvider, useDetails} from "@site/src/components/context/details";

const findSummary = (children: ReactNode) => {
    let summary: ReactNode = null
    const restChildren: ReactNode[] = []

    Children.forEach(children, (child, index) => {
        if (child && (child as ReactElement).type === Summary) {
            summary ||= child
            return
        }

        let c = child
        if (
            !summary &&
            child &&
            typeof child === 'object' &&
            (child as ReactElement).type !== Details &&
            'props' in child &&
            child.props
        ) {
            const result = findSummary(child.props.children)
            summary = result[0]
            c = cloneElement(child, {
                ...child.props,
                children: result[1] ?? undefined,
                key: index
            })
        }
        restChildren.push(c)
    })

    return [summary, restChildren]
}

export function Spoiler({title, children}: { title: ReactNode | string, children: ReactNode }) {
    return (
        <Details>
            <Summary>{title}</Summary>
            {children}
        </Details>
    );
}

const Details = ({children, open, ...props}: ComponentProps<'details'>): ReactElement => {
    const [openState, setOpen] = useState(!!open)
    const [summary, restChildren] = findSummary(children)

    // To animate the close animation we have to delay the DOM node state here.
    const [delayedOpenState, setDelayedOpenState] = useState(openState)
    useEffect(() => {
        if (openState) {
            setDelayedOpenState(true)
        } else {
            const timeout = setTimeout(() => setDelayedOpenState(openState), 500)
            return () => clearTimeout(timeout)
        }
    }, [openState])

    return (
        <details
            className="my-4 rounded border border-gray-200 bg-white p-2 shadow-sm first:mt-0 dark:border-neutral-800 dark:bg-neutral-900 border-solid"
            {...props}
            open={delayedOpenState}
            {...(openState && {'data-expanded': true})}
        >
            <DetailsProvider value={setOpen}>{summary}</DetailsProvider>
            <Collapse isOpen={openState}>{restChildren}</Collapse>
        </details>
    )
}

const Summary = (props: ComponentProps<'summary'>): ReactElement => {
    const setOpen = useDetails()
    return (
        <summary
            className={"flex items-center cursor-pointer list-none p-1 transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800 " +
                "before:mr-1 before:inline-block before:transition-transform before:content-[''] dark:before:invert " +
                "before:shrink-0 rtl:before:rotate-180 [[data-expanded]>&]:before:rotate-90"
            }
            {...props}
            onClick={e => {
                e.preventDefault()
                setOpen(v => !v)
            }}
        />
    )
}

function Collapse({children, className, isOpen, horizontal = false}: {
    children: ReactNode
    className?: string
    isOpen: boolean
    horizontal?: boolean
}): ReactElement {
    const containerRef = useRef<HTMLDivElement>(null)
    const innerRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef(0)
    const initialOpen = useRef(isOpen)
    const initialRender = useRef(true)

    useEffect(() => {
        const container = containerRef.current
        const inner = innerRef.current
        const animation = animationRef.current
        if (animation) {
            clearTimeout(animation)
        }
        if (initialRender.current || !container || !inner) return

        container.classList.toggle('duration-500', !isOpen)
        container.classList.toggle('duration-100', isOpen)

        if (horizontal) {
            // save initial width to avoid word wrapping when container width will be changed
            inner.style.width = `${inner.clientWidth}px`
            container.style.width = `${inner.clientWidth}px`
        } else {
            container.style.height = `${inner.clientHeight}px`
        }

        if (isOpen) {
            animationRef.current = window.setTimeout(() => {
                // should be style property in kebab-case, not css class name
                container.style.height = `${inner.clientHeight}px`
            }, 250)
        } else {
            setTimeout(() => {
                if (horizontal) {
                    container.style.width = '0px'
                } else {
                    container.style.height = '0px'
                }
            }, 0)
        }
    }, [horizontal, isOpen])

    useEffect(() => {
        initialRender.current = false
    }, [])

    return (
        <div
            ref={containerRef}
            className="transform-gpu overflow-hidden transition-all ease-in-out motion-reduce:transition-none"
            style={initialOpen.current || horizontal ? undefined : {height: 0}}
        >
            <div
                ref={innerRef}
                className={cn(
                    'transition-all duration-500 ease-in-out motion-reduce:transition-none',
                    isOpen ? 'opacity-100' : 'opacity-0',
                    className
                )}
            >
                <div className={"pb-2"}></div>
                {children}
            </div>
        </div>
    )
}
