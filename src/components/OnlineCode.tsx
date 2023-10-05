import React, {ComponentProps, ReactElement, useCallback, useEffect, useState} from "react";
import CodeBlock from "@docusaurus/theme-classic/lib/theme/CodeBlock";

export function OnlineCode({src, lang, title}: {
    src: string
    lang: string
    title?: string
}): ReactElement {
    const [code, setCode]: [code: string | null, setCode: any] = useState();

    useEffect(() => {
        fetch(src)
            .then((res) => res.text())
            .then((code) => setCode(code))
    }, []);

    return (
        <>
            {
                !code && (<div>Loading code...</div>)
            }
            {
                code && (
                    <CodeBlock language={lang} children={code} title={title}/>
                )
            }
        </>
    )
}