import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Bob Dynamics',
  description: 'First-principles vehicle dynamics analysis for Formula SAE',
  base: '/',
  appearance: 'dark',

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/bob.png' }],
  ],

  themeConfig: {
    logo: '/bob.png',
    siteTitle: 'Bob Dynamics',

    nav: [
      { text: 'BobSim', link: '/workflows/' },
      { text: 'Reference', link: '/reference/' },
      // Add new top-nav entries here
    ],

    sidebar: {
      // BobSim pages — only show solver nav
      '/workflows/': [
        {
          text: 'BobSim',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/workflows/' },
            { text: 'Characterization', link: '/workflows/characterization' },
            { text: 'Design of Experiments', link: '/workflows/doe' },
          ]
        },
      ],

      // Reference pages — only show reference nav
      '/reference/': [
        {
          text: 'Reference',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/reference/' },
          ]
        },
        {
          text: 'Performance Metrics',
          collapsed: false,
          link: '/reference/metrics',
          items: [
            { text: 'Steady-State Handling', link: '/reference/metrics#steady-state-handling' },
            { text: 'Transient Handling', link: '/reference/metrics#transient-handling' },
            { text: 'Stability & Control', link: '/reference/metrics#stability-and-control' },
            { text: 'Frequency-Domain', link: '/reference/metrics#frequency-domain-metrics' },
          ]
        },

        {
          text: 'Control Theory',
          collapsed: false,
          link: '/reference/control-theory',
          items: [
            // Add headings here as you write them, e.g.:
            // { text: 'PID Control', link: '/reference/control-theory#pid-control' },
          ]
        },
      ],
    },

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
