import {PrismTheme, themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

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
  organizationName: 'awakenedredstone', // Usually your GitHub org/username.
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

  plugins: [
    /*[
      'content-docs',
      /!** @type {import('@docusaurus/plugin-content-docs').Options} *!/
      ({
        id: 'autowhitelist',
        path: './docs/minecraft/autowhitelist',
        routeBasePath: '/minecraft/autowhitelist',
        sidebarPath: require.resolve('./sidebars/autowhitelist.js'),
        editCurrentVersion: true,
      }),
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
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          path: './docs',
          routeBasePath: '',
          sidebarPath: 'sidebars.ts',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Awakened Docs',
      logo: {
        alt: 'Awakened Redstone Logo',
        src: 'img/redstone_border.png',
      },
      items: [
        {
          type: 'docSidebar',
          position: 'left',
          sidebarId: 'autowhitelist',
          label: 'Auto Whitelist',
        },
        {to: '/blog', label: 'Blog', position: 'right'},
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
