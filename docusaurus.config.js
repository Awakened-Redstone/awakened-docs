// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

module.exports = async function createConfigAsync() {
  /** @type {import('@docusaurus/types').Config} */
  return {
    title: 'My Site',
    tagline: 'Dinosaurs are cool',
    favicon: 'img/favicon.ico',

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
        'classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            sidebarPath: require.resolve('./sidebars.js'),
            // Please change this to your repo.
            // Remove this to remove the "edit this page" links.
            editUrl:
              'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          },
          theme: {
            customCss: require.resolve('./src/css/custom.css'),
          },
        }),
      ],
      /*[
        '@docusaurus/preset-classic',
        {
          docs: {

          },
        },
      ],*/
      /*[
        'redocusaurus',
        {
          // Plugin Options for loading OpenAPI files
          specs: [
            {
              spec: './static/openapi.yaml',
              route: '/api/',
            },
          ],
          // Theme Options for modifying how redoc renders them
          theme: {
            // Change with your site colors
            primaryColor: '#1890ff',
          },
        }
      ]*/
    ],
    //themes: ["mdx-v2"],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        // Replace with your project's social card
        image: 'img/docusaurus-social-card.jpg',
        navbar: {
          title: 'Awakened Docs',
          logo: {
            alt: 'My Site Logo',
            src: 'img/logo.svg',
          },
          items: [
            {
              type: 'dropdown',
              label: 'Minecraft',
              position: 'left',
              items: [
                {
                  type: 'docSidebar',
                  sidebarId: 'autoWhitelistSidebar',
                  label: 'Auto Whitelist',
                },
              ]
            },
            {
              type: 'docSidebar',
              sidebarId: 'tutorialSidebar',
              position: 'left',
              label: 'Tutorial',
            },
            {to: '/api', label: 'API', position: 'left'},
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
              title: 'Docs',
              items: [
                {
                  label: 'Tutorial',
                  to: '/docs/intro',
                },
              ],
            },
            {
              title: 'Community',
              items: [
                {
                  label: 'Stack Overflow',
                  href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                },
                {
                  label: 'Discord',
                  href: 'https://discordapp.com/invite/docusaurus',
                },
                {
                  label: 'Twitter',
                  href: 'https://twitter.com/docusaurus',
                },
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
                  href: 'https://github.com/facebook/docusaurus',
                },
              ],
            },
          ],
          copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
          additionalLanguages: ['json5', 'json'],
        },
        colorMode: {
          defaultMode: 'dark',
          disableSwitch: false,
          respectPrefersColorScheme: true,
        },
      }),

    plugins: [
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
    ]
  };
};
