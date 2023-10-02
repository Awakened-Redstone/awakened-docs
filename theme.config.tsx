import {DocsThemeConfig} from "nextra-theme-docs";
import {NextSeoProps} from "next-seo";

export default {
    useNextSeoProps() {
        return {
            titleTemplate: '%s – Awakened docs',
        } as NextSeoProps;
    },
    logo: <span>Awakened Docs</span>,
    docsRepositoryBase: 'https://github.com/Awakened-Redstone/coeus-docs',
    project: {
        link: 'https://github.com/Awakened-Redstone/',
    },
} as DocsThemeConfig;