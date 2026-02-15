import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Bob Dynamics',
  description: 'Vehicle dynamics reference and analysis framework',
  base: '/',
  appearance: 'dark',

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/bob.png' }],
  ],

  themeConfig: {
    logo: '/bob.png',
    siteTitle: 'Bob Dynamics',

    nav: [
      { text: 'The Vision', link: '/vision' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        collapsed: false,
        link: '/',
        items: [
          { text: 'Design Philosophy', link: '/#design-philosophy' },
          { text: 'What This Site Contains', link: '/#what-this-site-contains' },
          { text: 'What This Site Does Not Do', link: '/#what-this-site-does-not-do' },
        ]
      },
      {
        text: 'Performance Metrics',
        collapsed: false,
        link: '/metrics',
        items: [
          { text: 'Steady-State Handling', link: '/metrics#steady-state-handling' },
          { text: 'Transient Handling', link: '/metrics#transient-handling' },
          { text: 'Stability & Control', link: '/metrics#stability-and-control' },
          { text: 'Frequency-Domain', link: '/metrics#frequency-domain-metrics' },
        ]
      }
    ],

    outline: { level: [2, 3], label: 'On this page' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/rhorvath02/VehicleDynamics' },
    ],

    search: {
      provider: 'local',
    },

    docFooter: {
      prev: 'Previous',
      next: 'Next'
    },
  },

  markdown: {
    math: true,
    theme: 'github-dark'
  },

  cleanUrls: true
})
