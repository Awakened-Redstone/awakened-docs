import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as Content from '@docusaurus/plugin-content-docs';
import {resolve} from "node:path";

const config: Config = {
  title: 'Awakened Docs',
  tagline: 'Documentation for the Awakened Redstone\'s projects',
  favicon: 'img/redstone_border.png',

  // Set the production url of your site here
  url: 'https://docs.awakenedredstone.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'awakened-redstone', // Usually your GitHub org/username.
  projectName: 'awakened-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          id: 'autowhitelist',
          path: './docs/minecraft/autowhitelist',
          routeBasePath: '/minecraft/autowhitelist',
          lastVersion: 'current',
          sidebarPath: 'sidebars.ts',
          versions: {
            current: {
              label: '1.0.0 Beta 5',
            },
              "1.0.0-beta.3": {
              label: '1.0.0 Beta 3',
            },
            "1.0.0-beta.1": {
              label: '1.0.0 Beta 1',
            },
          },
        },
        /*docs: {
          id: 'autowhitelist',
          path: './docs/minecraft/autowhitelist',
          routeBasePath: '/minecraft/autowhitelist',
          sidebarPath: 'sidebars/autowhitelist.ts',
          lastVersion: 'current',
          versions: {
            current: {
              label: '1.0.0Beta3',
            },
          },
        },*/
        /*blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },*/
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    /*[
      '@docusaurus/plugin-content-docs',
      ({
        id: 'autowhitelist',
        path: './docs/minecraft/autowhitelist',
        routeBasePath: '/minecraft/autowhitelist',
        sidebarPath: 'sidebars/autowhitelist.ts',
        editCurrentVersion: true,
        lastVersion: 'current',
        versions: {
          current: {
            label: '1.0.0Beta3',
          },
        },
      } satisfies Content.Options),
    ],*/
    async function tailwind(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
    function (context, options) {
      return {
        name: 'webpack-alias',
        configureWebpack(config, isServer) {
          return {
            resolve: {
              alias: {
                '@src': resolve(context.siteDir, "src"),
                "@lib": resolve(context.siteDir, "src", "lib"),
                "@components": resolve(context.siteDir, "src", "components"),
                "@shadcn": resolve(context.siteDir, "src", "components", "ui"),
              }
            }
          };
        },
      };
    }
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Awakened Docs',
      logo: {
        alt: 'Awakened Redstone Logo',
        src: 'img/redstone_border.png',
      },
      hideOnScroll: true,
      items: [
        {
          type: 'docSidebar',
          position: 'left',
          sidebarId: 'autowhitelist',
          label: 'Auto Whitelist',
          docsPluginId: 'autowhitelist',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
          docsPluginId: 'autowhitelist',
        },
        /*{to: '/blog', label: 'Blog', position: 'right'},*/
        {
          href: 'https://discord.gg/MTqsjwMpN2',
          label: 'Discord',
          position: 'right',
        },
        {
          href: 'https://github.com/Awakened-Redstone/awakened-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Minecraft Docs',
          items: [
            {
              label: 'AutoWhitelist',
              to: '/minecraft/autowhitelist/introduction',
            }
          ],
        },
        {
          title: 'Community',
          items: [
            /*{
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },*/
            {
              label: 'Discord',
              href: 'https://discord.gg/MTqsjwMpN2',
            },
            /*{
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },*/
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Awakened-Redstome/awakened-docs',
            },
          ],
        },
      ],
      copyright: `Awakened Redstone © 2018-${new Date().getFullYear()}`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['json', 'json5'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
