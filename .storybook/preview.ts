import type { Preview } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import '../src/index.css';

export const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};
export const decorators = [withRouter];
