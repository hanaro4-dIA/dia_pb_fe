import type { StorybookConfig } from '@storybook/react-vite';

interface CustomStorybookConfig extends StorybookConfig {
  webpackFinal?: (config: any) => Promise<any>;
}

const config: CustomStorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    'storybook-addon-react-router-v6',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  webpackFinal: async (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'jsdoc-type-pratt-parser': require.resolve('jsdoc-type-pratt-parser'),
    };
    return config;
  },
};

export default config;
