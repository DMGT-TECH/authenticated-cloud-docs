/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Authenticated Cloud Documents',
  tagline: 'Securing your docs',
  url: 'https://dev.authdocstest.ml.labs.dmgt.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'dmgt-tech', // Usually your GitHub org/user name.
  projectName: 'authenticated-cloud-docs', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Authenticated Cloud Documents',
      logo: {
        alt: 'DMGT Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'detail',
          position: 'left',
          label: 'Example Details',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/DMGT-TECH/authenticated-cloud-docs',
          label: 'Get Code',
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
              label: 'Home',
              to: '/',
            },
            {
              label: 'Details',
              to: '/detail',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'DMGT.com',
              href: 'https://www.dmgt.com',
            },
            {
              label: 'Code Repository',
              href: 'https://github.com/DMGT-TECH/authenticated-cloud-docs',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Github Actions',
              to: 'https://github.com/features/actions',
            },
            {
              label: 'NodeJS',
              href: 'https://nodejs.org',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} DMGT, plc.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          // Please change this to your repo.
          editUrl:
            'https://github.com/DMGT-TECH/authenticated-cloud-docs/edit/main/authenticated-cloud-docs/content/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
