import { defineConfig } from 'dumi';

const repo = 'HS-FORM-Render';

export default defineConfig({
  title: repo,
  favicon: '/images/img.png',
  logo: '/images/img.png',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  base: `/${repo}/`,
  publicPath: `/${repo}/`,
  navs: [
    null,
  ],
  // more config: https://d.umijs.org/config
});
