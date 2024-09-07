import * as path from 'path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'use-disclosable',
  description: 'A react hook for easily manage dislosable elements',
  icon: '/logo.png',
  logoText: 'use-disclosable',
  logo: {
    light: '/logo.png',
    dark: '/logo.png',
  },
  themeConfig: {
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/web-infra-dev/rspress' },
    ],
  },
});
